export const BIN_ID = '6932161243b1c97be9d868f0';
export const BIN_SECRET = '$2a$10$sV.w2uJ6HwkguXs2vwUM4u15GSm0E5DTYrU3f35WeRaWAA2Z2tGEO';

export type Produto = {
  id: number;
  nome: string;
  preco: number;
  imagem?: string;
};

export async function fetchProdutos(): Promise<Produto[]> {
  const url = `https://api.jsonbin.io/v3/b/${BIN_ID}/latest`;
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (BIN_SECRET) headers['X-Master-Key'] = BIN_SECRET;

  const res = await fetch(url, { method: 'GET', headers });
  if (!res.ok) {
    throw new Error(`Erro ao buscar produtos: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  // jsonbin v3 coloca os dados em record
  const produtos = data.record?.produtos ?? data.produtos ?? [];
  return produtos;
}
