import {useMock} from "@/app/lib/mock";

export async function POST(request: Request) {
  const {mock} = await request.json();
  await useMock(mock);

  return Response.json({mock});
}
