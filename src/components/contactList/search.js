export const contains = (cardFName,cardLName,query) => {
    if(cardFName.contains(query)||cardLName.contains(query)){
        return true;
    }
    return false;
}
export default contains; 