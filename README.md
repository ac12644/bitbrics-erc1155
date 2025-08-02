![Tests](https://github.com/ac12644/bitbrics-erc1155/actions/workflows/tests.yml/badge.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

<p align="center">
  <img src="./logo.png" alt="BitBrics Logo" width="120" />
</p>

# BitBricsERC1155

Fractional Real Estate Income Token (ERC1155, KYC, Pausable, Admin, Supply Lock)

---

## Overview

**BitBricsERC1155** is a smart contract built to let people own shares of real estate on the Polygon blockchain. It uses the ERC1155 token standard and includes features like KYC verification, supply limits, and admin controls to keep everything secure and compliant. This makes it easy for the platform to manage property shares while ensuring only verified users can participate.

- **Chain:** Polygon Mainnet & Amoy Testnet
- **Deployed Testnet Address:** `0x4F1920a8770CC3210d61A71f313d5e817e86EeFc`
- **Test Metadata Endpoint:** `https://bitbricks.vercel.app/api/erc1155uri/{id}.json`

---

## Features

- **ERC1155-based multi-property tokens**
- **Per-property max supply** (immutable after set)
- **KYC enforcement:** Only KYC-approved users can receive, hold, or transfer tokens
- **Admin-controlled pausing/unpausing** for full emergency control
- **Backend operator separation:** Daily operations via platform-controlled hot wallet, all powers also available to multisig owner
- **On-chain events** for all sensitive operations (mint, transfer, KYC, admin actions)
- **No public approvals:** Tokens cannot be freely listed/traded on external marketplaces
- **Upgradeable URI:** Owner can update metadata base URI

---

## Contract Roles & Access Control

| Role        | Address Type    | Permissions                                                                                |
| ----------- | --------------- | ------------------------------------------------------------------------------------------ |
| **Owner**   | Multisig/cold   | Pause/unpause, set backend, set max supply, admin transfer, update URI, all backend powers |
| **Backend** | Hot wallet      | Mint, transfer, set KYC, batch ops, daily ops                                              |
| **Users**   | KYC’d addresses | Hold, receive tokens via platform, claim income, view properties                           |

**Owner can perform all backend actions for redundancy and compliance.**

---

## Key Functions

| Function             | Access        | Purpose                                          |
| -------------------- | ------------- | ------------------------------------------------ |
| `setURI`             | Owner         | Update metadata URI                              |
| `pause` / `unpause`  | Owner         | Emergency halt/resume                            |
| `setBackendOperator` | Owner         | Rotate backend hot wallet                        |
| `setMaxSupply`       | Owner         | Set one-time max supply per property             |
| `setKYC`             | Owner/Backend | Approve/revoke user KYC                          |
| `mint` / `mintBatch` | Owner/Backend | Mint property tokens (KYC and supply-restricted) |
| `platformTransfer`   | Owner/Backend | Platform-controlled transfer                     |
| `adminForceTransfer` | Owner         | Admin/emergency transfer override                |

---

## Metadata Format

The metadata endpoint must return ERC1155-compliant JSON for each token ID:

```json
{
  "name": "BitBricks Property #1",
  "description": "Fractional token for Milan real estate.",
  "image": "https://bitbricks.vercel.app/static/property1.png",
  "attributes": [
    { "trait_type": "City", "value": "Milan" },
    { "trait_type": "Fraction", "value": "1/1000" }
  ]
}
```

_OpenSea, PolygonScan, and wallets will fetch this via the contract’s `uri(id)` method._

---

## Security and Compliance

- **Role-based admin/ops model**: Owner uses multisig; backend can be rotated instantly
- **No external marketplace listing**: Public approvals disabled, all transfers KYC and platform-gated
- **Events for all critical actions**: Full transparency for auditors and users
- **Pausable**: Emergency stop capability
- **Comprehensive test suite**: All critical contract paths covered with Hardhat/TypeScript

---

## Deployment

### **Deploy to Polygon Amoy Testnet**

```bash
npx hardhat ignition deploy ignition/modules/BitBricsERC1155.ts --network polygon_amoy
```

### **Deploy to Polygon Mainnet**

```bash
npx hardhat ignition deploy ignition/modules/BitBricsERC1155.ts --network polygon
```

- **Initial owner:** Set to your Gnosis Safe or trusted address during deployment
- **Base URI:** Set to your live metadata endpoint

---

## Usage (Sample Calls)

```solidity
// Set KYC for user (backend or owner)
bitbrics.setKYC(user, true);

// Mint tokens (backend or owner)
bitbrics.mint(user, propertyId, 10, "");

// Platform transfer (backend or owner)
bitbrics.platformTransfer(from, to, propertyId, 5, "");

// Pause contract (owner)
bitbrics.pause();

// Update metadata URI (owner)
bitbrics.setURI("https://bitbricks.vercel.app/api/erc1155uri/{id}.json");
```

---

## Audit & Trust

- **OpenZeppelin v5.4.0**: All code built on audited, modern standards
- **Public test suite**: See `/test/BitBricsERC1155.ts`
- **Audits welcome!**
- **Security best practice:** Use multisig for owner, rotate backend keys if compromised

---

## Contract Addresses

| Network          | Address                                      |
| ---------------- | -------------------------------------------- |
| **Amoy Testnet** | `0x4F1920a8770CC3210d61A71f313d5e817e86EeFc` |
| **Mainnet**      | _(to be published)_                          |

---

## License

MIT © BitBrics

---

## Contact & Community

- abhishek@fractz.com
- [Open support issue on GitHub](https://github.com/yourrepo/issues)

---

_For security, audit, and commercial inquiries, contact the BitBrics team._
