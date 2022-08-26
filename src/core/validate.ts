export function parseAndValidateParams(options: any, validTokens: string[]) {
  let { date, token } = options;

  if (token && !validTokens.includes(token)) {
    throw new Error(
      `Invalid token name: ${token}. Token must be in: ${validTokens.join(
        ', '
      )}`
    );
  }

  if (date) {
    try {
      date = new Date(Date.parse(date)).setHours(0, 0, 0, 0);
      date = date / 1000;
    } catch (error) {
      throw new Error(
        `Invalid date: ${date}. Date format should be YYYY-MM-DD`
      );
    }
  }

  return { date, token };
}
