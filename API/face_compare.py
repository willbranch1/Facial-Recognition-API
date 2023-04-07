import face_recognition
import sys
import json

def find_match(unknown, known):
    """Function takes in two filepaths, loads the images, and compares the faces within the images.
       Returns True or False depending if there is a match of faces.
    """
    unknown_image = face_recognition.load_image_file(unknown)
    known_image = face_recognition.load_image_file(known)
    
    unknown_encoding = face_recognition.face_encodings(unknown_image) #returns an array of each face encoding in the picture
    known_encoding = face_recognition.face_encodings(known_image)
    
    if len(unknown_encoding) == 1 and len(known_encoding) == 1: #checks if there is only one face in each picture       
        result = face_recognition.compare_faces([unknown_encoding[0]], known_encoding[0]) #returns boolean array with an entry for each face in the picture
        return result[0]
    else:
        return False
    
def main():
    #Load the system parameters.
    temp = sys.argv[1] #temp jpg filepath
    valid = json.loads(sys.argv[2]) #json array of the filepaths of the valid jpgs
    
    #Cycle through the array of filepaths and check if each entry contains a face that matches the temp jpg face
    #If a match is found, return the filepath. Otherwise, return a '0' char.
    for i in range(len(valid)):
        result = find_match(temp, valid[i]['filepath'])
        if result:
            print(valid[i]['filepath'])
            return
    print('0')
    return

if __name__ == "__main__":
    main()

