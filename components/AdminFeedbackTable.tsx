"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "./ui/badge";
import { Edit, Save, ThumbsUp, User, X } from "lucide-react";
import { STATUS_GROUPS, STATUS_ORDER } from "@/app/data/status-data";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function AdminFeedbackTable({ posts }: { posts: any[] }) {
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [postStatus, setPostStatus] = useState<Record<number, string>>(
    Object.fromEntries(posts.map((post) => [post.id, post.status])),
  );
  const [originalStatus, setOriginalStatus] = useState<Record<number, string>>(
    {},
  );

  const handleStatusChange = (postId: number, newStatus: string) => {
    setPostStatus((prev) => ({
      ...prev,
      [postId]: newStatus,
    }));
  };

  const startEditing = (postId: number) => {
    setOriginalStatus((prev) => ({
      ...prev,
      [postId]: originalStatus[postId],
    }));
    setEditingPostId(postId);
  };
  const cancelEditing = (postId: number) => {
    if (originalStatus[postId]) {
      setPostStatus((prev) => ({
        ...prev,
        [postId]: originalStatus[postId],
      }));
    }
    setEditingPostId(null);
  };

  const saveStatus = async (postId: number) => {
    const loadingToast = toast.loading("Saving status...");

    try {
      const response = await fetch(`/api/feedback/${postId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: postStatus[postId],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      toast.dismiss(loadingToast);
      toast.success("Feedback status updated successfully!");
      setEditingPostId(null);
    } catch (error) {
      console.error("Failed to update status: ", error);
      toast.dismiss(loadingToast);
      toast.error("Failed to update feedback status, Please try again.");
    }
  };
  const getStatusIcon = (status: string) => {
    const statusGroup = STATUS_GROUPS[status as keyof typeof STATUS_GROUPS];
    if (!statusGroup) return null;
    const Icon = statusGroup.icon;
    return <Icon className="h-3 w-3 mr-1" />;
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Feedback</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Votes</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {posts.map((post) => {
  const isEditing = editingPostId === post.id;
  const currentStatus: string = postStatus[post.id] ?? "";

  const categoryDesign = getCategoryDesign(post.category);
  const CategoryIcon = categoryDesign.icon;

  return (
    // ...
    <TableCell className="align-middle">
      {isEditing ? (
        <Select
          value={currentStatus}
          onValueChange={(value) =>
            handleStatusChange(post.id, value)
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue>
              <div className="flex items-center">
                {getStatusIcon(currentStatus)}
                {
                  STATUS_GROUPS[
                    currentStatus as keyof typeof STATUS_GROUPS
                  ]?.title
                }
              </div>
            </SelectValue>
          </SelectTrigger>

          <SelectContent>
            {STATUS_ORDER.map((status) => {
              const statusGroup =
                STATUS_GROUPS[
                  status as keyof typeof STATUS_GROUPS
                ];

              const Icon = statusGroup.icon;

              return (
                <SelectItem key={status} value={status}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {statusGroup.title}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      ) : (
        // ...
      )}
    </TableCell>
  );
})}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
