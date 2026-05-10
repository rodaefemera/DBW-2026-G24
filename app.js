import express from "express"; // importação do pacote express em syntax module
import path from "path"; // Importa o módulo 'path' do Node.js para lidar com caminhos de ficheiros e diretórios.
import { fileURLToPath } from "url"; // Importa a função 'fileURLToPath' do módulo 'url' para converter URLs de ficheiro em caminhos de ficheiro.

import indexRoutes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // apanha o diretório de execução do ficheiro

const app = express();
app.set("view engine", "ejs"); //método para configurar a nossa view engine para "ejs"
app.use(express.static(__dirname + "/public")); //é uma função middleware no framework Express.js para Node.js que serve arquivos estáticos, como imagens, arquivos CSS e JavaScript.
app.use(express.urlencoded({ extended: true })); //é uma função middleware do Express.js que é usada para analisar dados de formulários HTML que são enviados para o servidor.

// Cada grupo de rotas é montado num prefixo, o que facilita organizar a aplicação por funcionalidade.
app.use('/', indexRoutes);

app.listen(3000, (err) => {
    if (err)
        console.error(err);
    else
        console.log("Server listening on PORT", 3000);
});
