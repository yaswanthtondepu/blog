from splitwise import Splitwise
from splitwise.expense import Expense
from splitwise.user import ExpenseUser
from splitwise.error import SplitwiseError
sObj = Splitwise("tRKPVo9kBmJAieiCL7HP0iYE1eKVKkGUkjBOdg3H","tWJcU3dTuTC9aUbKuZIh0ZNHtCASQLckJhOegEJc",api_key="SxJnxiEl4YE211Z1FypJ8BkKPeXgPA37CMc0NJjp")

print(sObj.getCurrentUser().getId() , sObj.getCurrentUser().getFirstName()  )

expense = Expense()
expense.setCost('10')
expense.setDescription("Testing")

user1 = ExpenseUser()
user1.setId(42505341)
user1.setPaidShare('10.00')
user1.setOwedShare('5.0')

user2 = ExpenseUser()
user2.setId(42357118)
user2.setPaidShare('0.00')
user2.setOwedShare('5.00')


users = []
users.append(user1)
users.append(user2)

expense.setUsers(users)

expense, errors = sObj.createExpense(expense)


# print( dir(errors),errors.getErrors())
print (expense.getId() )