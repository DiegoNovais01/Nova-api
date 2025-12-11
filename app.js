async function getApi() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/photos")
    if (res.ok) throw new Error("Erro ao buscar dados")
    const data = await res.json()
    return data
  } catch {
    return [
      { mensagem: "deu erro" }
    ]
  }
    
}

export default getApi