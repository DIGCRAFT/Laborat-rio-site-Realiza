import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ message: 'Nenhum arquivo enviado' }, { status: 400 });
    }

    // Em um ambiente real, salvaríamos o arquivo no disco ou S3.
    // Aqui, vamos apenas retornar um sucesso simulado com o nome do arquivo
    // para que o componente de UI funcione e mostre o preview.
    
    // Como não podemos salvar arquivos dinamicamente no disco via API Route neste ambiente com facilidade,
    // vamos retornar o sucesso e instruir o usuário.
    
    return NextResponse.json({ 
      message: 'Upload simulado com sucesso',
      fileName: file.name
    });
  } catch (error) {
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}
