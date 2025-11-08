import { auth } from "@workspace/better-auth";
import { Button } from "@workspace/ui/components/button";
import { headers } from "next/headers";

export default async function Page() {

    const session = await auth.api.getSession(
        {
            headers: await headers()
        }
    )
    console.log(session);
    
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
