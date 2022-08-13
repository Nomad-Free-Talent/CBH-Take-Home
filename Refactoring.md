# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

From the original code we have to pass all `if` statement even though the result is determined already.

For instance, if no input is provided the result is literally `0`, there's no other option and no need to check about the length of partitionKey or typeof partitionKey.
So I have extracted it as the first `if` statement to judge if we can only return `0` or have to check the other conditions.

Also, I've found that if the partitionKey is not provided and generated from the input data, it's length can not exceed `MAX_PARTITION_KEY` and no need to check the length, anymore.
So I've splited that logic as second if statement.

Finally, I've checked if provided candidate is `string` type and if it's length exceed `256`.