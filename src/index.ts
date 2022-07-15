import { appConfig } from './config/app.config';

const app = appConfig.App;
const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
