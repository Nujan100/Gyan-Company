class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        lst = []
        for i in candies:
            if i + extraCandies >= max(candies):
                lst.append(True)
            else:
                lst.append(False)
        return lst