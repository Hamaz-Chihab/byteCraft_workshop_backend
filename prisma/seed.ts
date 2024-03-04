import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Courses
  // const course1 = await prisma.course.create({
  //   data: {
  //     name: "Math 2",
  //   },
  // });

  // const course2 = await prisma.course.create({
  //   data: {
  //     name: "franch Literature",
  //   },
  // });

  // Students
  const student1 = await prisma.student.create({
    data: {
      firstName: "lhecdh",
      lastName: "iigdfafbrahim",
      email: "lkdjfsjfdsfsfsf",
      phoneNumber: "+1234567890",
      password: "098765gdgsa4321", // Use a strong password hashing mechanism in production
      course: {
        connect: { id: "3b896648-bd5b-471c-8cf7-3feb03f46cf5" }, // Connect to the created course
      },
    },
  });

  const student2 = await prisma.student.create({
    data: {
      firstName: "chohhhhcho",
      lastName: "haha",
      email: "gddgdggg",
      phoneNumber: "+9876543210",
      password: "passwordd123", // Use a strong password hashing mechanism in production
      course: {
        connect: { id: "3b896648-bd5b-471c-8cf7-3feb03f46cf5" }, // Connect to the created course
      },
    },
  });
  const student3 = await prisma.student.create({
    data: {
      firstName: "lhecdh",
      lastName: "iigdfafbrahim",
      email: "jkhghfhvcbn",
      phoneNumber: "+1234567890",
      password: "098765gdgsa4321", // Use a strong password hashing mechanism in production
      course: {
        connect: { id: "3b896648-bd5b-471c-8cf7-3feb03f46cf5" }, // Connect to the created course
      },
    },
  });

  const student4 = await prisma.student.create({
    data: {
      firstName: "chohhhhcho",
      lastName: "haha",
      email: "klljl",
      phoneNumber: "+9876543210",
      password: "passwordd123", // Use a strong password hashing mechanism in production
      course: {
        connect: { id: "3b896648-bd5b-471c-8cf7-3feb03f46cf5" }, // Connect to the created course
      },
    },
  });

  // console.log({ student1, student2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
