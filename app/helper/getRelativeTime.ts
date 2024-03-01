 const getRelativeTime = (date: Date) => {
    const currentDate = new Date();
    const entryDate = new Date(date.start);
    const yearsDifference = currentDate.getFullYear() - entryDate.getFullYear();
    const monthsDifference = currentDate.getMonth() - entryDate.getMonth();

    if (yearsDifference > 0) {
      if (yearsDifference === 1) {
        return "About 1 year ago";
      } else {
        return `About ${yearsDifference} years ago`;
      }
    } else if (monthsDifference > 0) {
      if (monthsDifference === 1) {
        return "About 1 month ago";
      } else {
        return `About ${monthsDifference} months ago`;
      }
    } else {
      return "Less than a month ago";
    }
  };

  export default getRelativeTime;