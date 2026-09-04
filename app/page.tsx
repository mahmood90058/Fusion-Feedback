import GredientHeader from '@/components/GredientHeader'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight, BarChart, MessageSquare, Users, Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Homepage = () => {
  return (
    <div className='space-y-12 '>
      {/* Hero section */}
      <GredientHeader title='Shape the future of our product' subtitle='Feedback Fusion is where your ideas come to life'>
        <div className='flex gap-4 justify-center p-4'>
          <Button size="lg" className="bg-white text-blue-500 hover:bg-gray-100">
            <Link className='flex items-center gap-2' href="/feedback/new">Submit Feedback <ArrowRight className='ml-2 h-4 w-4' />
            </Link>

          </Button>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100">
            <Link className='flex items-center gap-2' href="/roadmap">View Roadmap <ArrowRight className='ml-2 h-4 w-4' />
            </Link>

          </Button>

        </div>



      </GredientHeader>

      {/* feature section */}



      <section>
        <h2 className='text-3xl font-bold mb-8 text-center'>How it Works</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <Card>
            <CardHeader>
              <MessageSquare className='h-8 w-8 text-primary mb-2' />
              <CardTitle>Submit Ideas</CardTitle>
            </CardHeader>
            <CardContent className='text-muted-foreground'>
              Share your suggesation and feature request with community
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart className='h-8 w-8 text-primary mb-2' />
              <CardTitle>Vote & Priortise</CardTitle>
            </CardHeader>
            <CardContent className='text-muted-foreground'>
              Upvote Ideas you love to help us understand what matters most

            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className='h-8 w-8 text-primary mb-2' />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent className='text-muted-foreground'>
              Follow our public roadmap to see what we are working on next.

            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Zap className='h-8 w-8 text-primary mb-2' />
              <CardTitle>See Results</CardTitle>
            </CardHeader>
            <CardContent className='text-muted-foreground'>
              Watch as your feedback transforms into real features and improvement.

            </CardContent>
          </Card>

        </div>
      </section>


      {/* stats section */}

      <section className='  text-center'>
        <div className='inline-grid grid-cols-3 gap-8  '>
          <div >
            <div className='text-3xl font-bold'>1,234+
            </div>

            <div className='text-muted-foreground'>
              Suggestions
            </div>
            </div>

            <div>
              <div className='text-3xl font-bold'>8,901+
              </div>

              <div className='text-muted-foreground'>
                Votes Cast
              </div>
              </div>



              <div>
                
                <div className='text-3xl font-bold'>254+
                </div>

                <div className='text-muted-foreground'>
                  Feature Shipped  </div>

              </div>
    


              </div>








          </section>





        </div>
        )
}

        export default Homepage