const formatDate = (inputDate) => {
       const options = { day: "numeric", month: "short" };
       const [month, day] = new Date(inputDate)
         .toLocaleDateString("default", options)
         .split(" ");
   
       // Convert the first letter of the month to uppercase and concatenate with the day
       const formattedDate = `${day} ${month.charAt(0).toUpperCase()}${month.slice(
         1
       )}`;
       return formattedDate;
     };

     export default formatDate;