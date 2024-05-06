const getCategoryIcons = (id) => {
    switch (id) {
        case "foodandbeverage":
            return require("../../../assets/images/burger.png");
        case "shopping":
            return require("../../../assets/images/bag.png");
        case "transportation":
            return require("../../../assets/images/charging.png");
        case "traveling":
            return require("../../../assets/images/travel.png");
        case "education":
            return require("../../../assets/images/education.png");
        case "electricitybill":
            return require("../../../assets/images/electricity-bill.png");
        case "internetbill":
            return require("../../../assets/images/wifi.png");
        case "medicalcheck-up":
            return require("../../../assets/images/healthcare.png");
        case "entertainment":
            return require("../../../assets/images/popcorn.png");
        case "donation":
            return require("../../../assets/images/donate.png");
        case "rentals":
            return require("../../../assets/images/rent.png");
        case "otherexpense":
            return require("../../../assets/images/otherexpense.png");
        case "salary":
            return require("../../../assets/images/salary.png");
        case "businessprofit":
            return require("../../../assets/images/businessprofit.png");
        case "otherincome":
            return require("../../../assets/images/otherexpense.png");
        case "loan":
            return require("../../../assets/images/loan.png");
        case "debt":
            return require("../../../assets/images/debt.png");
        case "debtcollection":
            return require("../../../assets/images/debtcollection.png");
        case "repayment":
            return require("../../../assets/images/repayment.png");
        case "default":
            return require("../../../assets/images/placeholdericon.png");
        default:
            return require("../../../assets/images/placeholdericon.png");
    }
}

export default getCategoryIcons;