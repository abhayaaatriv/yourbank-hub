import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AILogs() {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">AI Logs</h1>
        <p className="text-muted-foreground mt-2">View AI decision logs and explanations</p>
      </div>

      <Card className="border-2">
        <CardHeader>
          <CardTitle>AI Decision Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[700px] rounded-lg overflow-hidden border border-border">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTcRZdOZ6J4cd0Z-rO_T9TA5z-QrYFnAU_q-_d24sEgOCms_VZFH-JGzEnOVaGEpCFBmVfMH_k4TdG/pubhtml?gid=0&single=true&widget=true&headers=false"
              className="w-full h-full"
              title="AI Logs"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
