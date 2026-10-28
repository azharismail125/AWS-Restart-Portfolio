import random
print("Welcome to guess the number!")
print("The rules are simple. I will think of a number, and you will try to guess it") # these are the instructions
number = random.randint(1,10) #This means a random integer between 1 and 10 generated once program is run?
isGuessRight = False
while isGuessRight != True:
    guess =input("Guess a number between 1 and 10")
    if int(guess) == number:
        print("You guess {}. That is correct! You win!".format(guess)) #The response starts here
        isGuessRight=True
    else:
        print("You guessed {}. Sorry, that isn't it. Try again".format(guess))
