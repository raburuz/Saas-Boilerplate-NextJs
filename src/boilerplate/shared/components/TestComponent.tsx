
"use client"

import { useState } from 'react'
import { Button } from '@/shadcn/ui/button'
import { Alert } from '@/shadcn/ui/alert'
import { Badge } from '@/shadcn/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/ui/card"
import { Input } from '@/shadcn/ui/input'

export const TestComponent = () => {

  const [disabled, setDisabled] = useState(false)

  return (
    <div className='w-full my-32 flex flex-col gap-20'>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Colors</h2>
        <div className='flex flex-col justify-center items-center gap-6'>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>BG</span>
                <div className='w-6 h-6 bg-background border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>FG</span>
                <div className='w-6 h-6 bg-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>Primary BG</span>
                <div className='w-6 h-6 bg-primary border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>Primary FG</span>
                <div className='w-6 h-6 bg-primary-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>secondary BG</span>
                <div className='w-6 h-6 bg-secondary border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>secondary FG</span>
                <div className='w-6 h-6 bg-secondary-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>accent BG</span>
                <div className='w-6 h-6 bg-accent border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>accent FG</span>
                <div className='w-6 h-6 bg-accent-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>muted BG</span>
                <div className='w-6 h-6 bg-muted border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>muted FG</span>
                <div className='w-6 h-6 bg-muted-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>destructive BG</span>
                <div className='w-6 h-6 bg-destructive border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>destructive FG</span>
                <div className='w-6 h-6 bg-destructive-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>card BG</span>
                <div className='w-6 h-6 bg-card border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>card FG</span>
                <div className='w-6 h-6 bg-card-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>popover BG</span>
                <div className='w-6 h-6 bg-popover border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>popover FG</span>
                <div className='w-6 h-6 bg-popover-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>selection BG</span>
                <div className='w-6 h-6 bg-selection border border-black'></div>
              </div>
              <div>
                <span className='text-xs'>selection FG</span>
                <div className='w-6 h-6 bg-selection-foreground border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>border BG</span>
                <div className='w-6 h-6 bg-border border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>ring BG</span>
                <div className='w-6 h-6 bg-ring border border-black'></div>
              </div>
            </div>
            <div className='flex gap-2'>
              <div>
                <span className='text-xs'>input BG</span>
                <div className='w-6 h-6 bg-input border border-black'></div>
              </div>
            </div>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Buttons</h2>
        <Button onClick={()=>setDisabled(!disabled)}>Disabled</Button>
        <div className='flex justify-center gap-6'>
            <Button variant={'default'} disabled={disabled} >primary</Button>
            <Button variant={'secondary'} disabled={disabled}>secondary</Button>
            <Button variant={'outline'} disabled={disabled}>outline</Button>
            <Button variant={'destructive'} disabled={disabled}>destructive</Button>
            <Button variant={'ghost'} disabled={disabled}>ghost</Button>
            <Button variant={'link'} disabled={disabled}>link</Button>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Alert</h2>
        <div className='flex justify-center gap-6'>
            <Alert variant={'default'} >default</Alert>
            <Alert variant={'success'} >success</Alert>
            <Alert variant={'info'} >info</Alert>
            <Alert variant={'warning'} >warning</Alert>
            <Alert variant={'destructive'} >destructive</Alert>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Badge</h2>
        <div className='flex justify-center gap-6'>
            <Badge variant={'default'}  >primary</Badge>
            <Badge variant={'secondary'} >secondary</Badge>
            <Badge variant={'success'} >Success</Badge>
            <Badge variant={'warning'} >warning</Badge>
            <Badge variant={'destructive'} >destructive</Badge>
            <Badge variant={'outline'} >outline</Badge>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Card</h2>
        <div className='flex justify-col gap-6'>
        <Card className='max-w-sm'>
          <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Card Content</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum mollitia labore hic? Voluptate </p>
          </CardContent>
          <CardFooter className='flex-col'>
            <p>Card Footer</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique al.</p>
          </CardFooter>
        </Card>
        </div>
      </div>

      <div className='flex flex-col items-center gap-4'>
        <h2 className='font-bold text-xl'>Input</h2>
        <div className='flex justify-col gap-6'>
          <Input type='text'/>
        </div>
      </div>

    </div>
  )
}
