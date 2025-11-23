import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AILogs() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Logs</h1>
        <p className="text-muted-foreground mt-2">View AI decision logs and explanations</p>
      </div>

      <Card className="border-2 shadow-lg">
        <CardHeader className="border-b border-border">
          <CardTitle className="text-xl">Accounts Opened</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Conversation Logs with YourBank AI
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <div className="relative w-full h-[550px] overflow-hidden rounded-b-lg bg-muted/10">
            <div
              className="absolute top-0 left-0 origin-top-left"
              style={{ transform: "scale(1.15)", width: "87%", height: "87%" }}
            >
              <iframe
                src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTcRZdOZ6J4cd0Z-rO_T9TA5z-QrYFnAU_q-_d24sEgOCms_VZFH-JGzEnOVaGEpCFBmVfMH_k4TdG/pubhtml?gid=1519206664&amp;single=true&amp;widget=true&amp;headers=false"
                className="w-full h-full border-0"
                title="Accounts Opened"
                loading="lazy"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
