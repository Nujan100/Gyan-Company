nums = [0,0,1]

i=0
count =0
while count < (len(nums)):
    if nums[i] == 0:
        nums.pop(i)
        nums.append(0)
    else:
        i = i+1
    count+=1
print(nums)