export type Language = 'en' | 'ml';

export const translations = {
  en: {
    // Common
    continue: 'Continue',
    skip: 'Skip',
    getStarted: 'Get Started',
    loginRequired: 'Login Required',
    signInRegister: 'Sign In / Register',
    allCaughtUp: 'All caught up!',
    noNotifications: "You have no new notifications. We'll let you know when something exciting happens.",
    restoreDummyData: 'Restore Dummy Data',
    startShopping: 'Start Shopping',
    backToHome: 'Back to Home',
    logout: 'Logout Account',
    
    // Notifications Screen
    notifications: 'Notifications',
    updatesAlerts: 'Updates & Alerts',
    markAllRead: 'Mark all as read',
    clearAll: 'Clear all',
    
    // Auth Screens
    whatShouldWeCallYou: 'What should we call you?',
    whereShouldWeDeliver: 'Where should we deliver?',
    fullName: 'Full Name',
    enterName: 'Enter your name',
    apartmentStreet: 'Apartment, Street or House No.',
    localityArea: 'Locality / Area',
    landmarkOptional: 'Landmark (Optional)',
    enterApartment: 'Enter apartment or street',
    enterLocality: 'Enter the locality',
    landmark: 'Landmark',
    
    // Preferences Screen
    settingsProfile: 'Settings & Profile',
    preferences: 'Preferences',
    joinSwipeShop: 'Join Swipe & Shop',
    joinDescription: 'Create an account or log in to track orders, save favorites, and enjoy a faster checkout.',
    appSettings: 'App Settings',
    pushNotifications: 'Push Notifications',
    language: 'Language',
    helpSupport: 'Help & Support',
    myAccount: 'My Account',
    manageAddresses: 'Manage Addresses',
    paymentMethods: 'Payment Methods',
    securityPassword: 'Security & Password',
    supportFeedback: 'Support & Feedback',
    activeGrievances: 'Active Grievances',
    raiseGrievance: 'Raise New Grievance',
    contactUs: 'Contact Us',
    emailSupport: 'Email Support',
    whatsappChat: 'WhatsApp Chat',
    callHelpline: 'Call Helpline',
    
    // Cart Screen
    myShoppingBag: 'My Shopping Bag',
    cart: 'Cart',
    orderSummary: 'Order Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    tax: 'Tax (8%)',
    total: 'Total',
    proceedToCheckout: 'Proceed to Checkout',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: "Looks like you haven't added anything to your cart yet. Explore our latest arrivals!",
    
    // Orders Screen
    myOrders: 'My Orders',
    ordersPlaced: 'orders placed',
    
    // Browse Screen
    seenEverything: "You've Seen Everything!",
    noMoreProducts: 'Check back later for more amazing products curated just for you.',
    restartDiscovery: 'Restart Discovery',
  },
  ml: {
    // Common
    continue: 'തുടരുക',
    skip: 'ഒഴിവാക്കുക',
    getStarted: 'തുടങ്ങാം',
    loginRequired: 'ലോഗിൻ ആവശ്യമാണ്',
    signInRegister: 'ലോഗിൻ / രജിസ്റ്റർ',
    allCaughtUp: 'എല്ലാം കണ്ടു തീർന്നു!',
    noNotifications: 'നിങ്ങൾക്ക് പുതിയ അറിയിപ്പുകൾ ഒന്നുമില്ല. പുതിയ കാര്യങ്ങൾ ഉണ്ടാകുമ്പോൾ ഞങ്ങൾ നിങ്ങളെ അറിയിക്കും.',
    restoreDummyData: 'ഡമ്മി ഡാറ്റ പുനഃസ്ഥാപിക്കുക',
    startShopping: 'ഷോപ്പിംഗ് തുടങ്ങാം',
    backToHome: 'ഹോം പേജിലേക്ക്',
    logout: 'ലോഗൗട്ട് ചെയ്യുക',
    
    // Notifications Screen
    notifications: 'അറിയിപ്പുകൾ',
    updatesAlerts: 'അപ്ഡേറ്റുകളും അലേർട്ടുകളും',
    markAllRead: 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക',
    clearAll: 'എല്ലാം ഒഴിവാക്കുക',
    
    // Auth Screens
    whatShouldWeCallYou: 'നിങ്ങളെ ഞങ്ങൾ എന്ത് വിളിക്കണം?',
    whereShouldWeDeliver: 'ഞങ്ങൾ എവിടെ ഡെലിവറി ചെയ്യണം?',
    fullName: 'പൂർണ്ണനാമം',
    enterName: 'നിങ്ങളുടെ പേര് നൽകുക',
    apartmentStreet: 'അപ്പാർട്ട്മെന്റ്, സ്ട്രീറ്റ് അല്ലെങ്കിൽ വീട്ടുനമ്പർ',
    localityArea: 'സ്ഥലം / പ്രദേശം',
    landmarkOptional: 'അടയാളം (നിർബന്ധമില്ല)',
    enterApartment: 'അപ്പാർട്ട്മെന്റ് അല്ലെങ്കിൽ സ്ട്രീറ്റ് നൽകുക',
    enterLocality: 'സ്ഥലം നൽകുക',
    landmark: 'അടയാളം',
    
    // Preferences Screen
    settingsProfile: 'സെറ്റിംഗ്സും പ്രൊഫൈലും',
    preferences: 'മുൻഗണനകൾ',
    joinSwipeShop: 'സ്വൈപ്പ് ആൻഡ് ഷോപ്പിൽ ചേരുക',
    joinDescription: 'ഓർഡറുകൾ ട്രാക്ക് ചെയ്യാനും, ഇഷ്ടപ്പെട്ടവ സേവ് ചെയ്യാനും, വേഗത്തിൽ ചെക്ക്ഔട്ട് ചെയ്യാനും ഒരു അക്കൗണ്ട് തുടങ്ങുക അല്ലെങ്കിൽ ലോഗിൻ ചെയ്യുക.',
    appSettings: 'ആപ്പ് സെറ്റിംഗ്സ്',
    pushNotifications: 'പുഷ് നോട്ടിഫിക്കേഷനുകൾ',
    language: 'ഭാഷ',
    helpSupport: 'സഹായവും പിന്തുണയും',
    myAccount: 'എന്റെ അക്കൗണ്ട്',
    manageAddresses: 'വിലാസങ്ങൾ നിയന്ത്രിക്കുക',
    paymentMethods: 'പേയ്മെന്റ് രീതികൾ',
    securityPassword: 'സുരക്ഷയും പാസ്‌വേഡും',
    supportFeedback: 'പിന്തുണയും ഫീഡ്‌ബാക്കും',
    activeGrievances: 'സജീവമായ പരാതികൾ',
    raiseGrievance: 'പുതിയ പരാതി നൽകുക',
    contactUs: 'ഞങ്ങളെ ബന്ധപ്പെടുക',
    emailSupport: 'ഇമെയിൽ പിന്തുണ',
    whatsappChat: 'വാട്സാപ്പ് ചാറ്റ്',
    callHelpline: 'ഹെൽപ്പ് ലൈനിൽ വിളിക്കുക',
    
    // Cart Screen
    myShoppingBag: 'എന്റെ ഷോപ്പിംഗ് ബാഗ്',
    cart: 'കാർട്ട്',
    orderSummary: 'ഓർഡർ സംഗ്രഹം',
    subtotal: 'സബ്ടോട്ടൽ',
    shipping: 'ഷിപ്പിംഗ്',
    tax: 'നികുതി (8%)',
    total: 'ആകെ',
    proceedToCheckout: 'ചെക്ക്ഔട്ടിലേക്ക് കടക്കുക',
    cartEmpty: 'നിങ്ങളുടെ കാർട്ട് ശൂന്യമാണ്',
    cartEmptyDesc: 'നിങ്ങൾ ഇതുവരെ കാർട്ടിൽ ഒന്നും ചേർത്തിട്ടില്ല. ഞങ്ങളുടെ പുതിയ കളക്ഷനുകൾ നോക്കൂ!',
    
    // Orders Screen
    myOrders: 'എന്റെ ഓർഡറുകൾ',
    ordersPlaced: 'ഓർഡറുകൾ നൽകി',
    
    // Browse Screen
    seenEverything: 'നിങ്ങൾ എല്ലാം കണ്ടു കഴിഞ്ഞു!',
    noMoreProducts: 'നിങ്ങൾക്കായി തിരഞ്ഞെടുത്ത കൂടുതൽ ഉൽപ്പന്നങ്ങൾക്കായി പിന്നീട് വീണ്ടും വരിക.',
    restartDiscovery: 'വീണ്ടും തുടങ്ങുക',
  }
};
