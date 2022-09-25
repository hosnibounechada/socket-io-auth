export const messageSchema = {
  id: "/message",
  type: "object",
  properties: {
    from: { type: "string" },
    to: { type: "string" },
    message: { type: "string" },
  },
  required: ["from", "to", "message"],
};
