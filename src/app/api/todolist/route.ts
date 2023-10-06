export async function GET(request: Request) {
  const status = new URL(request.url).searchParams.get('status')
  const offset = Number(new URL(request.url).searchParams.get('offset'))
  const limit = Number(new URL(request.url).searchParams.get('limit'))
  const sortBy = new URL(request.url).searchParams.get('sortBy')
  const isAsc = new URL(request.url).searchParams.get('isAsc')

  if (!status) {
    return new Response(
      JSON.stringify({ error: 'Status parameter is missing' }),
      {
        status: 400,
      },
    )
  }

  const apiUrl = `https://todo-list-api-mfchjooefq-as.a.run.app/todo-list?status=${status}&offset=${offset}&limit=${limit}&sortBy=${sortBy}&isAsc=${isAsc}`

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch data')
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), { status: 500 })
  }
}
