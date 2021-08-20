## Problem Level: MEDIUM


Write a function that maps a string into an array of name, string, and occupation pairs.

### Notes:
Return an empty array if given an empty string.

### Test cases:
```
organize("John Mayer, 41, Singer, Emily Blunt, 36, Actor") == [
  {:name=>"John Mayer", :age=>"41", :occupation=>"Singer"},
  {:name=>"Emily Blunt", :age=>"36", :occupation=>"Actor"}
]

```
```
organize("Conan O'Brien, 56, Talk Show Host, Anna Wintour, 69, Editor") == [
  {:name=>"Conan O'Brien", :age=>"56", :occupation=>"Talk Show Host"},
  {:name=>"Anna Wintour", :age=>"69", :occupation=>"Editor"}
]
```
```
organize("") == []
```


(problem source: Edabit)



### Problem
INPUT: String with name1, age1, occupation1, name2, age2, occupation2

OUTPUT array with person object with key value pairs


### Examples

1.
```
 "John Mayer, 41, Singer" => 
    [
      {
        name: “John Mayer”,
        age: 41,
        occupation: “Singer”
      }
    ]
```

2. 
```
"John Mayer, 41, Singer, Emily Blunt, 36, Actor" => 

  [
    { name: “John Mayer”, age: 41, occupation: “Singer”},
    { name: “Emily Blunt”, age: 36, occupation: “Actor”},
  ]
```
3. 
```
   “” => [] // empty string returns empty array
```
  


###  Data Structures
String input with all persons
Array list of person properties
Array returned with persons objects mapped


### Algorithm
1. Initialize function organize with parameter `people` as type string
2. Initialize variable with name `peopleProperties` and assign value of string split by comma delimiter “, ” 
3. Initialize a variable name `peopleMapped` and assign empty array
4. Initialize variable named `personPropertyCount` to 0
5. Initialize variable named `currentProperty` and assign value `null`
6. Initialize variable named `personDetail` to object or dictionary with keys name, age, occupation & set all values to null.
7. Iterate over peoplePropertiesList until length of said list minus 1
8. For every iteration, reassign `currentProperty` to element at current index of `personProperties` list
9. For every iteration, increment `count` plus 1
10. For every 3 properties, use first property as name, second property as age, & third as occupation
11. If `count` is 0, set `personDetail` name property to `currentProperty`
12. If `count` is 1, set `personDetail` age property to `currentProperty`
13. If `count` is 2, set `personDetail` occupation property to `currentProperty`
14. If `count` is equal to 2, push new object or dictionary with `personDetail` key value pairs  unto peopleMapped
15. If `count` is equal to 2, reassign `personDetail` back to initial value with keys name, age, occupation & set all values to null
16. If `count` is equal to 2, reset `count` via reassignment to zero
17. Return `peopleMapped`


Code
https://replit.com/join/ftykgdszii-mark-a-dev
