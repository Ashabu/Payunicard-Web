// eslint-disable-next-line import/no-anonymous-default-export
export default { 
    content : [
            ['პრემიალური ტარიფი - გადახდები განსაკუთრებული კლიენტებისთვის','ყველაზე მაღალი განაღდების/შესყიდვის ლიმიტები','3 უფასო სავალუტო ანგარიში','უფასო ინტერნეტ ბანკი და სმს მომსახურება','2 უფასო UNIcard Visa/Mastercard ბარათი ადგილზე უფასო მიტანით თბილისში ','უნიქულები საჩუქრად ანგარიშის პირველად შევსებისას','უნიქულების დაგროვება საუკეთესო ტარიფით','უფასო განაღდება VTB ბანკის ბანკომატებში']
    ],

    UniServices : [
        {
          title: 
            {
              geo: "ჩემი  უნისაფულე",
              eng: "My Uniwallet",
            }
          ,
          content:
             {
               geo:  ["ყველაფერი ერთ აპლიკაციაში", "უნიქარდთან ერთობლივი ელექტრონული საფულე", "ფინანსების კონფიდენციალური მართვა", "მარტივი და ყველასთვის ხელმისაწვდომი პროდუქტი"],
               eng: ["All In One App","UNIcard Integrated E-Wallet","Funds  Managed Confidentially","Simple & Affordable  Product for Everyone"],
             }
            ,
          icon:'../../Assets/Images/LandingImg/myWallet.svg',
         computerImg: { 
              geo: '../../Assets/Images/LandingImg/UniWallet-la.ka.png', 
              eng: '../../Assets/Images/LandingImg/UniWallet-la.en.png'
            },
          phoneImg: { 
            geo: '../../Assets/Images/LandingImg/UniWallet-mob.ka.png', 
            eng: '../../Assets/Images/LandingImg/UniWallet-mob.en.png'} ,
          active: false,
          id: 1,
        },
        {
          title: {
              geo: "ჩემი პროდუქტები",
              eng: "My Products",
            },
          content:{
               geo: ["საერთაშორისო UNIcard Visa/Mastercard საგადახდო ბარათები", "სასურველი სავალუტო პრიორიტეტი", "მოქნილი სატარიფო გეგმები", "ბარათის შეკვეთა და ანგარიშის გახსნა ონლაინ", "ბარათის  მიწოდება საქართველოს მასშტაბით"],
               eng: ["International Prepaid Cards - UNIcard co-brand Visa/Mastercard","Preferred Currency Priority","Flexible Tariff Plans","Card & Account Opened Online","Card Delivery Countrywide"],
             },
          icon:'../../Assets/Images/LandingImg/MyProducts1.svg',
          computerImg: {
                geo: '../../Assets/Images/LandingImg/MyProducts-la.ka.png',
                eng: '../../Assets/Images/LandingImg/MyProducts-la.en.png'
          } ,
          phoneImg: { 
               geo: '../../Assets/Images/LandingImg/MyProducts-mob.ka.png',
              eng: '../../Assets/Images/LandingImg/MyProducts-mob.en.png'
          } ,
          active: false,
          id: 2
        },
        {
          title: 
            {
              geo: "ჩემი გადახდები",
              eng: "My Bills",
            },
          content:
             {
               geo: ["ონლაინ გადახდები", "უნიქულებით კომუნალური გადასახადების გადახდა", "შაბლონები"],
               eng: ["Online Payments","Utility Payments with UNIpoints","Payment Templates"],
             },
          icon:'../../Assets/Images/LandingImg/myPayments.svg',
          computerImg: { 
              geo: '../../Assets/Images/LandingImg/MyPayments-la.ka.png',
              eng: '../../Assets/Images/LandingImg/MyPayments-la.en.png'
        }, 
          phoneImg: { 
                geo: '../../Assets/Images/LandingImg/MyPayments-mob.ka.png',
               eng: '../../Assets/Images/LandingImg/MyPayments-mob.en.png'
        }, 
          active: false,
          id: 3
        },
        {
          title: 
            {
              geo: "ჩემი გადარიცხვები",
              eng: "My Transactions",
            },
          content:
             {
               geo: ["გადარიცხვა საკუთარ ანგარიშებს შორის უფასოდ", "გადარიცხვა სხვის უნისაფულეზე უფასოდ", "გადარიცხვა ბანკში", "გადარიცხვის შაბლონები", "კონვერტაცია"],
               eng: ["Free Transfer to Own Accounts","Free Transfer to other’s UNIwallet","Transfer to Bank","Transfer Templates","Exchange"],
             },
          icon:'../../Assets/Images/LandingImg/myTranfers.svg',
         computerImg: { 
              geo: '../../Assets/Images/LandingImg/MyTransfers-la.ka.png', 
              eng: '../../Assets/Images/LandingImg/MyTransfers-la.en.png'
            }, 
          phoneImg: { 
            geo: '../../Assets/Images/LandingImg/MyTransfers-mob.ka.png', 
            eng: '../../Assets/Images/LandingImg/MyTransfers-mob.en.png',}, 
          active: false,
          id: 4
        },
        {
          title: 
            {
              geo: "ჩემი გზავნილები",
              eng: "My Transfers",
            }
          ,
          content:
             {
               geo: ["ფულადი გზავნილების მიღება UNIcard Visa/Mastercard ბარათებზე", "უნიქულების დაგროვება UNIcard Visa/Mastercard ბარათებით გადახდისას"],
               eng: ["Get Transfers Directly to Visa/Mastercard Cards","UNIpoints Collected on Purchase Transaction"],
             },
          icon:'../../Assets/Images/LandingImg/myTransaction.svg',
         computerImg: { geo: '../../Assets/Images/LandingImg/MyTransactions-la.ka.png',
          eng: '../../Assets/Images/LandingImg/MyTransactions-la.en.png',
        }, 
          phoneImg: { geo: '../../Assets/Images/LandingImg/MyTransactions-mob.ka.png',
           eng: '../../Assets/Images/LandingImg/MyTransactions-mob.en.png',
          }, 
          active: false, 
          id: 5
        },
        {
          title: 
            {
              geo: "ჩემი ლოიალობა",
              eng: "My Loiality",
            },
          content:
             {
               geo: ["უნიქულების დაგროვება მსოფლიოს მასშტაბით და ონლაინ","უნიქულებით კომუნალური  გადასახადების გადახდა","უნიქულების დაგროვება და სპეციალური შეთავაზებები პარტნიორ კომპანიებში","ქეშბექი","ფასდაკლებები"],
               eng: ["Collect UNIpoints Worldwide & Online","Utility Payments with UNIpoints","UNIpoints & Special Offers at Partner Companies","Cashback","Discounts"],
             },
          icon:'../../Assets/Images/LandingImg/myLoyality.svg',
         computerImg: { 
           geo: '../../Assets/Images/LandingImg/MyLoyality-la.ka.png', 
          eng: '../../Assets/Images/LandingImg/MyLoyality-la.en.png',
        }, 
          phoneImg: { 
            geo: '../../Assets/Images/LandingImg/MyLoyality-mob.ka.png',
           eng: '../../Assets/Images/LandingImg/MyLoyality-mob.en.png',
          }, 
          active: false,
          id: 6
        }
      
      ]
}