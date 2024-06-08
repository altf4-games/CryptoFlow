import { createThirdwebClient } from "thirdweb";

// Replace this with your client ID string
// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID

const clientId = "212a258f698fe1ccfa55047b44fb91fe";

export const client = createThirdwebClient({
  clientId: clientId,
});
