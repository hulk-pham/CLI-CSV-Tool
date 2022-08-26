## Question 1 - Programming

_We're looking at your programming ability. It must not only work, it should be maintainable._

Let us assume you are a crypto investor. You have made transactions over a period of time which is logged in a [CSV file](https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip). Write a command line program that does the following

- Given no parameters, return the latest portfolio value per token in USD
- Given a token, return the latest portfolio value for that token in USD
- Given a date, return the portfolio value per token in USD on that date
- Given a date and a token, return the portfolio value of that token in USD on that date

The CSV file has the following columns

- timestamp: Integer number of seconds since the Epoch
- transaction_type: Either a DEPOSIT or a WITHDRAWAL
- token: The token symbol
- amount: The amount transacted

Portfolio means the balance of the token where you need to add deposits and subtract withdrawals. You may obtain the exchange rates from [cryptocompare](https://min-api.cryptocompare.com/) where the API is free. You should write it in Node.js as our main stack is in Javascript/Typescript and we need to assess your proficiency.

## Submission

Please take no more than 7 days to finish. Your answers should comprise of the following

- Source code that you used for deriving the results
- README that explains various design decisions that you took.

Commit your answers in a private Github repository(it's free) and add Zan(liangzan), Kyle(kyled7), Thanh(thanhnpp), Ben(BenPropine) as collaborators. Inform us that it is done at zan@propine.com, kyle.dinh@propine.com, thanh.nguyen@propine.com, ben.nguyen@propine.com.
