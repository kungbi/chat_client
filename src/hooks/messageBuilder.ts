interface MessageInput {
  userId: number;
  friendId: number;
  username: string;
  message: string;
}

export interface MessageInterface {
  userId: number;
  username: string;
  friendId: number;
  message: string;
  datetime: string;
}

export const MessageBuilder = (input: MessageInput): MessageInterface => {
  const datetime = new Date()
    .toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
    .replace(/,/g, "");

  return {
    datetime,
    ...input,
  };
};
