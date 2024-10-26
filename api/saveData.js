import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const dataFilePath = path.join(process.cwd(), 'public', 'data.json');

        // Recebe os dados do corpo da requisição
        const { nome, notas } = req.body;

        try {
            // Lê o conteúdo atual do data.json
            const fileContent = fs.existsSync(dataFilePath)
                ? fs.readFileSync(dataFilePath, 'utf8')
                : '[]';
            
            // Converte para JSON e adiciona os novos dados
            const data = JSON.parse(fileContent);
            data.push({ nome, notas, timestamp: new Date() });

            // Salva os dados atualizados de volta no JSON
            fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));

            res.status(200).json({ message: 'Dados salvos com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao salvar dados', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} não permitido`);
    }
}
