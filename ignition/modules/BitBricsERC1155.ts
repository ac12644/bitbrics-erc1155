import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import * as dotenv from "dotenv";
dotenv.config();

const BASE_URI = process.env.BASE_URI as string;
const INITIAL_OWNER = process.env.INITIAL_OWNER as string;

export default buildModule("BitBricsERC1155Module", (m) => {
  const bitbrics = m.contract("BitBricsERC1155", [BASE_URI, INITIAL_OWNER]);
  return { bitbrics };
});
