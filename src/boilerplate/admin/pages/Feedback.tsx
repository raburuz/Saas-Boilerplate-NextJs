

/* Next */
import { MessageCircle } from "lucide-react"

/* Boilerplate */
import { DataView } from "@/boilerplate/dashboard"

/* FOLDER */
import { getFeedbackData } from "@/boilerplate/admin/actions";

/* SHADCN */
import { Card, CardContent } from "@/shadcn/ui/card";
import { Badge } from "@/shadcn/ui/badge";

/* COMPONENT */
export const FeedbackPage = async () => {

  const { feedbackList } = await getFeedbackData();

  return (
    <>
      <h1>Feedback</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

        <DataView
          title="Total Feedback"
          value={feedbackList.length}
          description={`Total feedback received`}
          icon={<MessageCircle className="w-4"/>}
        />
      </div>

      <div className="my-10 flex flex-col gap-3">   
        <h2 className="font-semibold">Feedback list</h2>
        <div className="flex gap-2">
          {
            feedbackList.map((data)=>(
              <Card key={data.id} className="max-w-xs">
                <CardContent className="p-4">
                  <div>
                    <span className="font-semibold">User: </span>
                    <Badge variant={"outline"}>{data.userId}</Badge>
                  </div>
                  <p className="mt-2">{data.feedback}</p>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>

    </>
  )
}
