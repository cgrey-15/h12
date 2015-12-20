'''
Simple code to dequote the following fields:
 - Population
 - LifeExpectancy
 - GNP
 - SurfaceArea

Also adds -1.0 for empty fields that are described above

Python 3.4 recommended
'''


def write_file( filename ):
   thefile = open(filename)

   result = []

   i = 1

   for line in thefile:
      pass1 = line.replace('opulation": "', 'opulation": ').replace('", "LifeE', ', "LifeE')
      pass1 = pass1.replace('opulation": , "LifeE', 'opulation": -1.0, "LifeE')
      pass2 = pass1.replace('tancy": "', 'tancy": ').replace('", "GNP"', ', "GNP"')
      pass2 = pass2.replace('tancy": , "GNP"', 'tancy": -1.0, "GNP"')
      pass3 = pass2.replace('"GNP": "', '"GNP": ').replace('", "GNPOld"', ', "GNPOld"')
      pass3 = pass3.replace('"GNP": , "GNPOld"', '"GNP": -1.0, "GNPOld"')
      pass4 = pass3.replace('"SurfaceArea": "', '"SurfaceArea": ').replace('", "IndepY', ', "IndepY')
      pass4 = pass4.replace('"SurfaceArea": , "IndepY', '"SurfaceArea": -1.0, "IndepY')
      print(str(i) + ' ' + pass4)
      i += 1

      result += pass4

   thefile.close()

   finalr = open('country2.json', 'w')

   for line in result:
      finalr.write(line)

   finalr.close()

def main():
   write_file('country1.json')

main()
