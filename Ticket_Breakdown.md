# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

- Add new field to facility table to store agent ids which indicates the agents working on the facility. (no criteria, est: 1hr)<p>
we can handle this problem by adding new column to facility table and update the database models for it.
- Add `getShiftsByAgent` function which is called with agent id, it should return the shifts worked with the Agent. (no criteria, est: 1.5hr)<p>
Write some query to get shifts by agent id instead of facility id.
- Add `getAgentsByFacility` function which is called with facility id, it should return agent id list. (first ticket have to be resolved, est: 1hr)<p>
Write query to retrieve agent id from facility id.
- Update `generateReport` function to get report by summarizing the shift daba by agent ids (second and third ticket must be resolved, est: 1hr)<p>
Just invoke `getAgentsByFacility` and `getShiftsByAgent` in order.
After then summarize the returned results and return that value.
