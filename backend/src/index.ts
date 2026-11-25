import { createApp } from './app';
import { FakeStoreProductService } from './services/FakeStoreProductService';
import { NodemailerEmailService } from './services/NodemailerEmailService';
import { config } from './config';

const productService = new FakeStoreProductService(config.fakeStoreBaseUrl);
const emailService = new NodemailerEmailService(config.smtp);

const app = createApp(productService, emailService);

app.listen(config.port, () => {
  console.log(`Backend running on http://localhost:${config.port}`);
});
