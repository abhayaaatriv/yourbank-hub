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
          <CardTitle className="text-xl">AI Decision Logs</CardTitle>
          <p className="text-sm text-muted-foreground mt-2">Explainable AI decisions and audit trail</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="w-full h-[700px] rounded-b-lg overflow-hidden bg-muted/20">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vTTcRZdOZ6J4cd0Z-rO_T9TA5z-QrYFnAU_q-_d24sEgOCms_VZFH-JGzEnOVaGEpCFBmVfMH_k4TdG/pubhtml?gid=0&single=true&widget=true&headers=false&chrome=false"
              className="w-full h-full border-0"
              title="AI Logs"
              loading="lazy"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
