import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin123", 12);

  const admin = await prisma.adminUser.upsert({
    where: { email: "admin@elitesoccer.com" },
    update: {},
    create: {
      email: "admin@elitesoccer.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  console.log("Admin user created:", admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
