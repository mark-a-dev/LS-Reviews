def string_mapper(people)
  peoplePropertiesList = people.split(", ")
  puts(peoplePropertiesList)
  peopleMapped = []
  personPropertyCount = 0
  currentProperty = nil
  personDetail = {
    name: nil,
    age: nil, 
    occupation: nil
  }

  propertyIndex = 0

  until propertyIndex > peoplePropertiesList.length - 1  do
    currentProperty = peoplePropertiesList[propertyIndex]
  
    if personPropertyCount === 0
      puts(personPropertyCount)
      personDetail[:name] = currentProperty
      personPropertyCount += 1
    elsif personPropertyCount === 1
      puts(personPropertyCount)
      personDetail[:age] = currentProperty
      personPropertyCount += 1
    elsif personPropertyCount === 2
      puts(personPropertyCount)
      personDetail[:occupation] = currentProperty
      
      personToPush = {
        name: personDetail[:name],
        age: personDetail[:age],
        occupation: personDetail[:occupation]
      }

      peopleMapped << personToPush
      personDetail = {
        name: nil,
        age: nil, 
        occupation: nil
      }

      personPropertyCount = 0
      
    end
    propertyIndex += 1
  end
  peopleMapped
end

p string_mapper('John May, 41, Singer')
p string_mapper("John Mayer, 41, Singer, Emily Blunt, 36, Actor")
