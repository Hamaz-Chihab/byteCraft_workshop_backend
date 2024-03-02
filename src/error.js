setTimeout(() => {
  throw new error("");
}, 300);
process.on("uncaughtEcxeption", () => {});
process.on("unhandledRegection", () => {});
