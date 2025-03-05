import { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import util from "util";

const execPromise = util.promisify(exec);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido, usa POST" });
  }

  const { recipient } = req.body;
  if (!recipient || !/^0x[a-fA-F0-9]{40}$/.test(recipient)) {
    return res.status(400).json({ error: "Dirección inválida" });
  }

  try {
    console.log(`🚀 Ejecutando minteo para ${recipient}...`);

    // Ejecuta el script de minteo con la dirección como argumento
    const { stdout, stderr } = await execPromise(`bunx hardhat run scripts/SoneiumTickerMint.ts --network minato --no-compile -- ${recipient}`);

    if (stderr) {
      console.error("❌ Error en la ejecución:", stderr);
      return res.status(500).json({ error: "Error en el minteo", details: stderr });
    }

    console.log(`✅ Minteo exitoso: ${stdout}`);
    return res.status(200).json({ message: "NFT minteado exitosamente", details: stdout });
  } catch (error: any) {
    console.error("❌ Error en el minteo:", error);
    return res.status(500).json({ error: "Error en el minteo", details: error.message });
  }
}
