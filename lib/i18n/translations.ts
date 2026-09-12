export type Language = 'ar' | 'fr' | 'en';

export interface TranslationDictionary {
  brand: {
    name: string;
    tagline: string;
    zeroUploads: string;
    processingNote: string;
  };
  nav: {
    compress: string;
    resize: string;
    convert: string;
    crop: string;
    compressDesc: string;
    resizeDesc: string;
    convertDesc: string;
    cropDesc: string;
  };
  theme: {
    toggle: string;
    light: string;
    dark: string;
    switchToDark: string;
    switchToLight: string;
  };
  lang: {
    select: string;
    arabic: string;
    french: string;
    english: string;
  };
  hero: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    subtitle: string;
    features: string;
  };
  dropzone: {
    title: string;
    subtitle: string;
    pill1: string;
    pill2: string;
    pill3: string;
    changeFile: string;
    selectToolPrompt: string;
    tools: {
      compress: string;
      compressDesc: string;
      resize: string;
      resizeDesc: string;
      convert: string;
      convertDesc: string;
      crop: string;
      cropDesc: string;
    };
    alertImageOnly: string;
  };
  popularTools: {
    title: string;
    subtitle: string;
    openTool: string;
  };
  trust: {
    title: string;
    subtitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
  howItWorks: {
    title: string;
    subtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  popularTasks: {
    title: string;
    subtitle: string;
    startTask: string;
    tasks: {
      tag: string;
      title: string;
      desc: string;
    }[];
  };
  faq: {
    title: string;
    subtitle: string;
    items: {
      q: string;
      a: string;
    }[];
  };
  footer: {
    desc: string;
    privacyBadge: string;
    toolsTitle: string;
    whyTitle: string;
    noReg: string;
    speed: string;
    zeroLogs: string;
    copyright: string;
    privacyFirst: string;
    cloudflare: string;
  };
  common: {
    comingSoon: string;
    phase: string;
    phase2Note: string;
    browse: string;
    dragAndDrop: string;
    dropHere: string;
    fileSelected: string;
    remove: string;
    maxSize: string;
    loading: string;
    error: string;
    success: string;
    reset: string;
    download: string;
    apply: string;
    cancel: string;
    close: string;
    home: string;
    allTools: string;
    ready: string;
    inProgress: string;
    invalidMime: string;
    fileTooLarge: string;
  };
  compressor: {
    title: string;
    subtitle: string;
    badge: string;
    dropzonePrompt: string;
    originalLabel: string;
    compressedLabel: string;
    settingsTitle: string;
    modeQuality: string;
    modeTarget: string;
    qualityLabel: string;
    qualityHelper: string;
    targetSizeLabel: string;
    targetSizeDisclaimer: string;
    preset100kb: string;
    preset200kb: string;
    preset500kb: string;
    customTarget: string;
    customKbPlaceholder: string;
    compressBtn: string;
    compressingBtn: string;
    stageDecoding: string;
    stageCompressing: string;
    stageEvaluating: string;
    stageFinalizing: string;
    stageComplete: string;
    resultTitle: string;
    originalSize: string;
    compressedSize: string;
    saved: string;
    dimensions: string;
    format: string;
    qualityUsed: string;
    downloadBtn: string;
    compressAnother: string;
    targetAchievedNote: string;
    targetNotAchievedNote: string;
    pngLosslessNote: string;
    privacyNotice: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    faqTitle: string;
    faqSubtitle: string;
    faqItems: { q: string; a: string }[];
    relatedToolsTitle: string;
    relatedToolsSubtitle: string;
  };
  resizer: {
    title: string;
    subtitle: string;
    badge: string;
    dropzonePrompt: string;
    originalInfo: string;
    originalDimensions: string;
    resizedDimensions: string;
    originalSize: string;
    resizedSize: string;
    fileType: string;
    dimensionsSettings: string;
    widthLabel: string;
    heightLabel: string;
    aspectRatioLock: string;
    aspectRatioUnlock: string;
    aspectRatioLockedHint: string;
    aspectRatioUnlockedHint: string;
    popularDimensionsTitle: string;
    popularDimensionsSubtitle: string;
    presetSquare: string;
    presetLandscapeFHD: string;
    presetLandscapeHD: string;
    presetPortrait: string;
    presetStory: string;
    presetCustom: string;
    presetRatioMismatchNote: string;
    outputSettings: string;
    outputFormat: string;
    formatOriginal: string;
    formatJpeg: string;
    formatPng: string;
    formatWebp: string;
    qualityLabel: string;
    qualityHelper: string;
    pngLosslessNote: string;
    resizeBtn: string;
    resizingBtn: string;
    stagePreparing: string;
    stageResizing: string;
    stageEncoding: string;
    stageComplete: string;
    resultTitle: string;
    downloadBtn: string;
    resizeAnother: string;
    sizeDifference: string;
    validationMinSize: string;
    validationMaxSize: string;
    validationMaxPixels: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    faqTitle: string;
    faqSubtitle: string;
    faqItems: { q: string; a: string }[];
    relatedToolsTitle: string;
    relatedToolsSubtitle: string;
  };
  converter: {
    title: string;
    subtitle: string;
    badge: string;
    dropzonePrompt: string;
    privacyNotice: string;
    originalInfo: string;
    originalFormat: string;
    targetFormat: string;
    originalDimensions: string;
    originalSize: string;
    convertedSize: string;
    dimensionsPreserved: string;
    formatSettingsTitle: string;
    formatSettingsSubtitle: string;
    selectTargetFormat: string;
    formatJpeg: string;
    formatPng: string;
    formatWebp: string;
    formatJpegDesc: string;
    formatPngDesc: string;
    formatWebpDesc: string;
    qualityLabel: string;
    qualityHelper: string;
    qualityWebpHelper: string;
    pngLosslessNote: string;
    transparencyWarningTitle: string;
    transparencyWarningDesc: string;
    bgColorLabel: string;
    bgColorWhite: string;
    bgColorBlack: string;
    bgColorCustom: string;
    sameFormatNotice: string;
    convertBtn: string;
    convertingBtn: string;
    stagePreparing: string;
    stageConverting: string;
    stageEncoding: string;
    stageComplete: string;
    resultTitle: string;
    convertedLabel: string;
    downloadBtn: string;
    convertAnother: string;
    sizeReduced: string;
    sizeIncreased: string;
    sizeUnchanged: string;
    formatChange: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    matrixTitle: string;
    matrixSubtitle: string;
    faqTitle: string;
    faqSubtitle: string;
    faqItems: { q: string; a: string }[];
    relatedToolsTitle: string;
    relatedToolsSubtitle: string;
  };
  cropper: {
    title: string;
    subtitle: string;
    badge: string;
    dropzonePrompt: string;
    privacyNotice: string;
    originalInfo: string;
    originalDimensions: string;
    croppedDimensions: string;
    cropSelection: string;
    cropBoxInfo: string;
    aspectRatioTitle: string;
    aspectRatioSubtitle: string;
    aspectRatioFree: string;
    aspectRatioSquare: string;
    aspectRatio43: string;
    aspectRatio169: string;
    aspectRatio916: string;
    aspectRatioFreeDesc: string;
    aspectRatioSquareDesc: string;
    aspectRatio43Desc: string;
    aspectRatio169Desc: string;
    aspectRatio916Desc: string;
    rotateLabel: string;
    rotate90: string;
    rotateReset: string;
    centerCropBtn: string;
    fitImageBtn: string;
    outputSettingsTitle: string;
    outputSettingsSubtitle: string;
    outputFormat: string;
    formatOriginal: string;
    formatJpeg: string;
    formatPng: string;
    formatWebp: string;
    qualityLabel: string;
    qualityHelper: string;
    pngLosslessNote: string;
    cropBtn: string;
    croppingBtn: string;
    stagePreparing: string;
    stageCropping: string;
    stageEncoding: string;
    stageComplete: string;
    resultTitle: string;
    croppedLabel: string;
    downloadBtn: string;
    cropAnother: string;
    howItWorksTitle: string;
    howItWorksSubtitle: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    benefit1Title: string;
    benefit1Desc: string;
    benefit2Title: string;
    benefit2Desc: string;
    benefit3Title: string;
    benefit3Desc: string;
    faqTitle: string;
    faqSubtitle: string;
    faqItems: { q: string; a: string }[];
    relatedToolsTitle: string;
    relatedToolsSubtitle: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ar: {
    brand: {
      name: 'أدوات الصور',
      tagline: '100% داخل المتصفح',
      zeroUploads: 'بدون رفع إلى السيرفر',
      processingNote: 'تتم المعالجة بالكامل محلياً داخل جهازك دون مغادرة ملفاتك.',
    },
    nav: {
      compress: 'ضغط الصور',
      resize: 'تغيير الحجم',
      convert: 'تحويل الصيغ',
      crop: 'قص الصور',
      compressDesc: 'تقليص حجم ملفات JPG و PNG و WebP',
      resizeDesc: 'تعديل الأبعاد ونسب العرض إلى الارتفاع',
      convertDesc: 'التحويل السريع بين JPG و PNG و WebP',
      cropDesc: 'قص وتأطير الصور بنسب دقيقة',
    },
    theme: {
      toggle: 'تبديل المظهر',
      light: 'الوضع النهاري',
      dark: 'الوضع الليلي',
      switchToDark: 'التحويل إلى الوضع الليلي',
      switchToLight: 'التحويل إلى الوضع النهاري',
    },
    lang: {
      select: 'تغيير اللغة',
      arabic: 'العربية',
      french: 'Français',
      english: 'English',
    },
    hero: {
      badge: 'معالجة فورية داخل المتصفح',
      titleStart: 'عدّل وحسّن صورك ',
      titleHighlight: 'في ثوانٍ معدودة',
      subtitle:
        'أدوات مجانية، فائقة السرعة وآمنة تماماً لضغط، تغيير حجم، تحويل وقص صورك مباشرة على جهازك.',
      features: 'بدون تسجيل • سرية تامة دون رفع للسيرفر • استخدام غير محدود',
    },
    dropzone: {
      title: 'اختر صورة أو اسحبها وأفلتها هنا',
      subtitle: 'ندعم صيغ JPG و PNG و WebP حتى 50 ميغابايت. المعالجة تتم فورياً في جهازك.',
      pill1: '100% داخل المتصفح',
      pill2: 'بدون رفع للسيرفر',
      pill3: 'بدون تسجيل حساب',
      changeFile: 'تغيير الصورة',
      selectToolPrompt: 'اختر الأداة المطلوبة لتطبيقها:',
      tools: {
        compress: 'ضغط الصورة',
        compressDesc: 'تقليل الحجم',
        resize: 'تعديل الأبعاد',
        resizeDesc: 'تغيير المقاسات',
        convert: 'تحويل الصيغة',
        convertDesc: 'تغيير النوع',
        crop: 'قص الصورة',
        cropDesc: 'تأطير وحواف',
      },
      alertImageOnly: 'يرجى اختيار ملف صورة صالح (JPG أو PNG أو WebP).',
    },
    popularTools: {
      title: 'أدوات الصور الرئيسية',
      subtitle: 'اختر الأداة المناسبة لمهمتك المحددة لمعالجة صورك بدقة.',
      openTool: 'فتح الأداة',
    },
    trust: {
      title: 'لماذا تختار منصة أدوات الصور؟',
      subtitle: 'صُممت من الأساس لضمان الخصوصية التامة، السرعة القصوى، وسهولة الاستخدام.',
      p1Title: 'خصوصية 100% على جهازك',
      p1Desc:
        'صورك لا ترفع إطلاقاً إلى أي سيرفر خارجي. تتم جميع العمليات في ذاكرة المتصفح عبر HTML5 Canvas لضمان الأمان التام.',
      p2Title: 'سرعة وتنفيذ فوري',
      p2Desc:
        'وداعاً للانتظار ورفع الملفات البطيء. نتائج المعالجة فورية وتنزيل الملفات ينتهي في أجزاء من الثانية.',
      p3Title: 'بدون حسابات أو إعلانات مزعجة',
      p3Desc:
        'لا حاجة لبريد إلكتروني أو كلمات مرور، ولا توجد قيود أو اشتراكات مدفوعة مخفية. أداة واضحة ومباشرة لك.',
    },
    howItWorks: {
      title: 'كيف يعمل الموقع؟',
      subtitle: 'ثلاث خطوات يسيرة بدون أي تعقيد أو برامج إضافية.',
      step1Title: '1. اختر صورتك',
      step1Desc: 'اسحب صورتك وأفلتها في المربع أو اخترها مباشرة من هاتفك أو حاسوبك.',
      step2Title: '2. حدد الإعدادات',
      step2Desc: 'اضبط مستوى الضغط أو المقاسات المطلوبة أو الصيغة المناسبة لك.',
      step3Title: '3. حمّل النتيجة فوراً',
      step3Desc: 'اضغط على زر التنزيل لحفظ الصورة المحسنة على جهازك في الحال.',
    },
    popularTasks: {
      title: 'مهام سريعة شائعة',
      subtitle: 'روابط فورية للمهام اليومية الأكثر طلباً من قبل المستخدمين.',
      startTask: 'بدء المهمة',
      tasks: [
        {
          tag: 'تقليص الحجم',
          title: 'ضغط JPG لمواقع الويب',
          desc: 'تقليل حجم ملفات الصور حتى 80% لتسريع تحميل صفحات الإنترنت.',
        },
        {
          tag: 'صيغ حديثة',
          title: 'تحويل إلى WebP',
          desc: 'تحويل صور PNG و JPG إلى صيغة WebP فائقة الكفاءة والوضوح.',
        },
        {
          tag: 'التواصل الاجتماعي',
          title: 'تغيير حجم للإنستغرام',
          desc: 'ضبط أبعاد الصور لتلائم المقاسات الموصى بها في المنصات الاجتماعية.',
        },
        {
          tag: 'أبعاد مخصصة',
          title: 'قص مربع 1:1',
          desc: 'قص مثالي للصور الشخصية ومربعات العرض والصور المصغرة.',
        },
      ],
    },
    faq: {
      title: 'الأسئلة الشائعة',
      subtitle: 'كل ما ترغب بمعرفته حول أدوات تعديل الصور الآمنة داخل المتصفح.',
      items: [
        {
          q: 'هل يتم رفع صوري إلى خوادمكم أو تخزينها؟',
          a: 'أبداً ومطلقاً. يعتمد الموقع على تقنيات HTML5 Canvas و Web APIs الحديثة التي تنفذ كل عمليات التعديل داخل ذاكرة متصفحك. لا تصل صورك إلى أي خادم خارجي نهائياً.',
        },
        {
          q: 'هل الموقع مجاني بالفعل؟',
          a: 'نعم، مجاني 100% وبدون أي تكاليف خفية أو علامات مائية على صورك المصدرة.',
        },
        {
          q: 'هل أحتاج إلى إنشاء حساب أو تسجيل الدخول؟',
          a: 'لا، يمكنك استخدام كافة الأدوات مباشرة بدون أي تسجيل دخول أو طلب بريد إلكتروني.',
        },
        {
          q: 'ما هي صيغ الصور المدعومة؟',
          a: 'ندعم حالياً الصيغ الأكثر استخداماً: JPG/JPEG و PNG و WebP التي تغطي أكثر من 98% من الاستخدام اليومي.',
        },
        {
          q: 'هل هناك حد أقصى لحجم الصورة؟',
          a: 'نظراً لأن المعالجة تتم على جهازك الشخصي، لا توجد قيود سيرفر مصطنعة. ننصح بملفات حتى 50 ميغابايت للحفاظ على سلاسة المتصفح.',
        },
      ],
    },
    footer: {
      desc: 'أدوات مجانية، سريعة، وآمنة لمعالجة الصور عبر الإنترنت. اضغط، غيّر الحجم، حوّل، وقص الصور مباشرة دون أي رفع إلى السيرفرات وبدون جمع أي بيانات.',
      privacyBadge: 'ملفاتك لا تغادر جهازك أبداً. معالجة محلية 100%.',
      toolsTitle: 'أدوات الصور',
      whyTitle: 'مميزات المنصة',
      noReg: 'لا يلزم التسجيل',
      speed: 'معالجة فائقة السرعة محلياً',
      zeroLogs: 'انعدام تام للسجلات والتخزين',
      copyright: 'جميع الحقوق محفوظة. أدوات معالجة صور مجانية داخل المتصفح.',
      privacyFirst: 'بنية تركز أولاً على الخصوصية',
      cloudflare: 'متوافق مع الاستضافة السريعة',
    },
    common: {
      comingSoon: 'قريباً',
      phase: 'المرحلة',
      phase2Note: 'هذه الأداة قيد التطوير وستتوفر في المرحلة القادمة.',
      browse: 'استعراض الملفات',
      dragAndDrop: 'أو اسحب وأفلت الملف هنا',
      dropHere: 'أفلت الملف الآن للرفع',
      fileSelected: 'تم تحديد الملف بنجاح',
      remove: 'إزالة',
      maxSize: 'الحد الأقصى للحجم',
      loading: 'جارِ التحميل...',
      error: 'خطأ',
      success: 'نجاح',
      reset: 'إعادة تعيين',
      download: 'تحميل',
      apply: 'تطبيق',
      cancel: 'إلغاء',
      close: 'إغلاق',
      home: 'الرئيسية',
      allTools: 'جميع الأدوات',
      ready: 'جاهز',
      inProgress: 'قيد التطوير',
      invalidMime: 'صيغة الملف غير مدعومة. يرجى اختيار ملف صورة بصيغة JPG أو PNG أو WebP.',
      fileTooLarge: 'حجم الملف كبير جداً. الحد الأقصى الموصى به هو 50 ميغابايت.',
    },
    compressor: {
      title: 'ضغط الصور أونلاين',
      subtitle: 'تقليص حجم ملفات الصور JPG و PNG و WebP بدقة عالية وبدون رفع ملفاتك إلى أي خادم خارجي. المعالجة محلية 100% في متصفحك.',
      badge: 'أداة نشطة — المرحلة 2',
      dropzonePrompt: 'اختر أو اسحب صورة لبدء عملية الضغط',
      originalLabel: 'الصورة الأصلية',
      compressedLabel: 'الصورة المضغوطة',
      settingsTitle: 'خيارات الضغط',
      modeQuality: 'التحكم بالجودة',
      modeTarget: 'حجم ملف محدد (Target Size)',
      qualityLabel: 'مستوى جودة الضغط',
      qualityHelper: 'القيمة الافتراضية 80% تمنح توازناً مثالياً بين وضوح الصورة وتوفير الحجم للويب.',
      targetSizeLabel: 'الحجم المستهدف المطلوب',
      targetSizeDisclaimer: 'ملاحظة: الحجم المستهدف هو تقريبي؛ لأن ترميز المتصفح يختلف بحسب تفاصيل الصورة وصيغتها.',
      preset100kb: '100 ك.ب',
      preset200kb: '200 ك.ب',
      preset500kb: '500 ك.ب',
      customTarget: 'حجم مخصص',
      customKbPlaceholder: 'أدخل الحجم بالكيلوبايت (مثال: 150)',
      compressBtn: 'ضغط الصورة الآن',
      compressingBtn: 'جاري الضغط...',
      stageDecoding: 'جاري قراءة وفك ترميز الصورة...',
      stageCompressing: 'جاري تطبيق خوارزمية الضغط في الذاكرة...',
      stageEvaluating: 'جاري معايرة نسبة الضغط للحجم المستهدف...',
      stageFinalizing: 'جاري تجهيز الملف والنتيجة...',
      stageComplete: 'تم الضغط بنجاح!',
      resultTitle: 'نتيجة ضغط الصورة',
      originalSize: 'الحجم الأصلي',
      compressedSize: 'الحجم بعد الضغط',
      saved: 'نسبة التوفير',
      dimensions: 'الأبعاد',
      format: 'الصيغة',
      qualityUsed: 'الجودة المطبقة',
      downloadBtn: 'تحميل الصورة المضغوطة',
      compressAnother: 'ضغط صورة أخرى',
      targetAchievedNote: 'تم الوصول إلى الحجم المطلوب بنجاح.',
      targetNotAchievedNote: 'الحجم تقريبي؛ تعذر الوصول للرقم المطلوب بدقة دون تشويه الأبعاد. هذه أفضل نتيجة ممكنة.',
      pngLosslessNote: 'ملاحظة بصيغة PNG: متصفحات الويب تستخدم ترميزاً غير فاقد للجودة (Lossless) مع صيغة PNG، لذلك لا ينخفض حجمها بشدة إلا بالتحويل إلى WebP أو JPG.',
      privacyNotice: 'تتم جميع العمليات محلياً على جهازك بواسطة Canvas. لا يتم رفع صورك أو حفظها على أي خادم أبداً.',
      howItWorksTitle: 'كيف يعمل ضغط الصور؟',
      howItWorksSubtitle: 'ثلاث خطوات سريعة دون الحاجة لتثبيت أي برامج أو إنشاء حسابات.',
      step1Title: '1. اختيار الصورة',
      step1Desc: 'اسحب صورتك أو حددها من جهازك (JPG أو PNG أو WebP).',
      step2Title: '2. ضبط إعدادات الضغط',
      step2Desc: 'اختر بين التحكم المباشر بنسبة الجودة أو تحديد حجم مستهدف مثل 100KB أو 200KB.',
      step3Title: '3. تحميل النتيجة فوراً',
      step3Desc: 'اضغط على زر الضغط واستلم النتيجة المحسوبة في ثوانٍ مع خيار التنزيل الفوري.',
      whyChooseTitle: 'لماذا تستخدم أداة ضغط الصور لدينا؟',
      whyChooseSubtitle: 'خصوصية كاملة، وسرعة فائقة بدون انتظار أو إعلانات مزعجة.',
      benefit1Title: 'خصوصية مطلقة 100%',
      benefit1Desc: 'ملفاتك لا تغادر متصفحك أبداً. لا نملك سيرفرات تخزن صورك، فكل بكسل يعالج في ذاكرة هاتفك أو حاسوبك.',
      benefit2Title: 'سرعة فائقة بدون انتظار',
      benefit2Desc: 'تجاوز أوقات الرفع والتحميل البطيئة إلى الخوادم السحابية. التحويل يتم مباشرة عبر متصفحك.',
      benefit3Title: 'توفير مساحة وتصفح أسرع',
      benefit3Desc: 'تقليص يصل إلى 85% من حجم الملف مما يسرع تحميل مواقع الويب ويسهل إرفاق الصور في البريد والمواقع.',
      faqTitle: 'الأسئلة الشائعة حول ضغط الصور',
      faqSubtitle: 'إجابات واضحة ودقيقة عن كيفية عمل الأداة وخصائصها التقنية.',
      faqItems: [
        {
          q: 'كيف تعمل عملية ضغط الصور؟',
          a: 'تقوم الأداة بقراءة ملف الصورة داخل متصفحك عبر واجهات Web APIs وHTML5 Canvas، ثم تعيد ترميز الصورة بمستوى جودة محدد يقلل من البيانات المكررة رياضياً دون التأثير الملحوظ على دقة التفاصيل البصرية.',
        },
        {
          q: 'هل يتم رفع صوري إلى أي خادم (Server)؟',
          a: 'كلا، إطلاقاً. الأداة تعمل وفق معمارية Client-Side خالصة 100%. صورك لا تغادر متصفحك أو جهازك نهائياً ولا يتم تخزينها.',
        },
        {
          q: 'هل يمكنني ضغط صور بصيغة JPEG؟',
          a: 'نعم، صور JPEG تحقق أفضل نسب تصغير، حيث يمكنك خفض الحجم من عدة ميغابايت إلى بضع مئات من الكيلوبايت مع المحافظة على وضوح ممتاز.',
        },
        {
          q: 'هل يمكنني ضغط صور بصيغة PNG؟',
          a: 'نعم، يتم دعم PNG. يرجى الملاحظة أن محرك المتصفح يستخدم ضغطاً غير فاقد (Lossless) لملفات PNG. للحصول على أقصى تقليص للحجم، يفضل استخدام WebP أو JPEG.',
        },
        {
          q: 'هل يمكنني ضغط الصورة إلى حجم 100 كيلوبايت أو 200 كيلوبايت أو 500 كيلوبايت؟',
          a: 'نعم، توفر الأداة وضع "الحجم المستهدف" (Target Size) مع خيارات سريعة لـ 100KB و 200KB و 500KB. تقوم الخوارزمية بمحاولات معايرة متعددة للوصول إلى أقرب حجم ممكن دون الإخلال بأبعاد الصورة.',
        },
        {
          q: 'هل ستنخفض جودة الصورة بشكل كبير؟',
          a: 'عند اختيار جودة 75%-85%، يظل الفرق البصري غير ملحوظ للعين المجردة مع تحقيق انخفاض هائل في مساحة التخزين.',
        },
        {
          q: 'ماذا يحدث لملفي الأصلي؟',
          a: 'ملفك الأصلي يظل كما هو على جهازك دون أي تعديل. النتيجة المضغوطة يتم تنزيلها كملف منفصل باسم يحمل اللاحقة -compressed.',
        },
        {
          q: 'هل أحتاج للتسجيل أو دفع أي رسوم؟',
          a: 'الأداة مجانية بالكامل ومتاحة بدون أي اشتراك، أو بطاقات ائتمان، أو حدود يومية مصطنعة.',
        },
        {
          q: 'ما هي الصيغ المدعومة حالياً؟',
          a: 'تدعم الأداة صيغ JPG/JPEG و PNG و WebP، وهي الصيغ الأكثر انتشاراً واستخداماً على شبكة الإنترنت.',
        },
      ],
      relatedToolsTitle: 'أدوات أخرى قادمة',
      relatedToolsSubtitle: 'استكشف الأدوات القادمة في المنصة للتعامل مع مختلف احتياجات الصور.',
    },
    resizer: {
      title: 'تغيير حجم الصور أونلاين',
      subtitle: 'تعديل أبعاد صور JPG و PNG و WebP بالبكسل مع قفل النسبة بدقة متناهية وبدون رفع أي ملفات.',
      badge: 'معالجة محلية 100% في المتصفح',
      dropzonePrompt: 'اختر صورة لتعديل أبعادها',
      originalInfo: 'معلومات الصورة الأصلية',
      originalDimensions: 'الأبعاد الأصلية',
      resizedDimensions: 'الأبعاد الجديدة',
      originalSize: 'الحجم الأصلي',
      resizedSize: 'حجم الملف الناتج',
      fileType: 'صيغة الملف',
      dimensionsSettings: 'إعدادات الأبعاد',
      widthLabel: 'العرض',
      heightLabel: 'الارتفاع',
      aspectRatioLock: 'قفل نسبة العرض إلى الارتفاع',
      aspectRatioUnlock: 'فك قفل النسبة',
      aspectRatioLockedHint: 'النسبة مقفلة: تغيير أحد الأبعاد يعدل البُعد الآخر تلقائياً',
      aspectRatioUnlockedHint: 'النسبة حرة: يمكنك تعديل العرض والارتفاع بشكل مستقل',
      popularDimensionsTitle: 'أبعاد شائعة',
      popularDimensionsSubtitle: 'خيارات سريعة للمقاسات الأكثر استخداماً',
      presetSquare: '1080 × 1080 (مربع)',
      presetLandscapeFHD: '1920 × 1080 (عريض FHD)',
      presetLandscapeHD: '1280 × 720 (عريض HD)',
      presetPortrait: '1080 × 1350 (رأسي 4:5)',
      presetStory: '1080 × 1920 (ستوري 9:16)',
      presetCustom: 'مخصص',
      presetRatioMismatchNote: 'تم تطبيق الأبعاد المحددة للمقاس المختار مباشرة دون قص أي جزء من الصورة.',
      outputSettings: 'إعدادات الإخراج والجودة',
      outputFormat: 'صيغة الإخراج',
      formatOriginal: 'نفس الصيغة الأصلية',
      formatJpeg: 'JPG / JPEG',
      formatPng: 'PNG',
      formatWebp: 'WebP',
      qualityLabel: 'مستوى الجودة',
      qualityHelper: 'المستوى الموصى به 85% لتوازن ممتاز بين الدقة والحجم.',
      pngLosslessNote: 'صيغة PNG تعتمد ضغطاً غير فاقد (Lossless) في المتصفح، لذا لا يؤثر شريط الجودة عليها.',
      resizeBtn: 'تغيير حجم الصورة الآن',
      resizingBtn: 'جاري تغيير الحجم...',
      stagePreparing: 'جاري قراءة الصورة في ذاكرة المتصفح...',
      stageResizing: 'جاري تحجيم الصورة وتنعيم البكسلات...',
      stageEncoding: 'جاري ترميز ملف الإخراج...',
      stageComplete: 'اكتمل تغيير الحجم بنجاح!',
      resultTitle: 'تم تغيير حجم الصورة بنجاح',
      downloadBtn: 'تنزيل الصورة المعدلة',
      resizeAnother: 'تعديل حجم صورة أخرى',
      sizeDifference: 'فرق الحجم',
      validationMinSize: 'يجب أن يكون البُعد 1 بكسل على الأقل.',
      validationMaxSize: 'تتجاوز الأبعاد الحد الأقصى الآمن للمتصفح (16,384 بكسل).',
      validationMaxPixels: 'يتجاوز إجمالي البكسلات سعة الذاكرة الآمنة للمتصفح (64 ميغابكسل).',
      howItWorksTitle: 'كيف يعمل تغيير حجم الصور؟',
      howItWorksSubtitle: '3 خطوات بسيطة ومباشرة في متصفحك دون أي تأخير.',
      step1Title: 'اختر الصورة',
      step1Desc: 'اسحب وأفلت أي صورة JPG أو PNG أو WebP من هاتفك أو جهازك.',
      step2Title: 'اضبط الأبعاد',
      step2Desc: 'أدخل العرض والارتفاع المطلوبين بالبكسل، أو اختر مقاساً شائعاً مع قفل نسبة الأبعاد.',
      step3Title: 'نزّل صورتك فوراً',
      step3Desc: 'اضغط على زر تغيير الحجم وحمّل صورتك الجديدة بجودة فائقة في أجزاء من الثانية.',
      whyChooseTitle: 'لماذا تختار أداة تغيير الحجم لدينا؟',
      whyChooseSubtitle: 'تجربة آمنة، سريعة، وبأعلى دقة بصرية ممكنة.',
      benefit1Title: 'خصوصية كاملة 100%',
      benefit1Desc: 'تتم المعالجة بالكامل محلياً داخل جهازك دون رفع أي بايت إلى خوادم خارجية.',
      benefit2Title: 'دقة بكسل فائقة',
      benefit2Desc: 'خوارزميات تنعيم بصرية متطورة مدمجة في المتصفح تضمن أقصى وضوح عند التصغير والتكبير.',
      benefit3Title: 'قفل ذكي للنسب',
      benefit3Desc: 'يحافظ على النسبة الأصلية لمنع تمدد الصورة أو تشوه أبعادها الطبيعية.',
      faqTitle: 'الأسئلة الشائعة حول تغيير الحجم',
      faqSubtitle: 'إجابات واضحة ومباشرة عن كيفية عمل الأداة وخصائصها التقنية.',
      faqItems: [
        {
          q: 'كيف يمكنني تغيير حجم صورة؟',
          a: 'ببساطة قم برفع صورتك، ثم حدد العرض أو الارتفاع المطلوب بالبكسل، واضغط على زر "تغيير حجم الصورة الآن" لتحصل على الملف فوراً.',
        },
        {
          q: 'هل يؤدي تغيير الحجم إلى قص (Crop) الصورة؟',
          a: 'كلا، تغيير الحجم (Resize) يقوم بإعادة قياس الصورة بالكامل ولا يقتطع أي أجزاء منها. ميزة القص مخصصة للأداة المنفصلة في المرحلة القادمة.',
        },
        {
          q: 'هل يؤدي تغيير الحجم إلى تقليل جودة الصورة؟',
          a: 'يستخدم المحرك خوارزميات تنعيم عالية الدقة (High Quality Bicubic Smoothing). عند تصغير الأبعاد تظل الصورة حادة جداً وممتازة، بينما التكبير المفرط قد يظهر بكسلات الصورة الأصلية.',
        },
        {
          q: 'هل يمكنني الحفاظ على نسبة العرض إلى الارتفاع الأصلية؟',
          a: 'نعم، خيار قفل النسبة (🔒) مفعل افتراضياً؛ عندما تعدل العرض، يتم حساب الارتفاع المتطابق تلقائياً لمنع أي تشوه.',
        },
        {
          q: 'هل يمكنني تغيير حجم الصورة إلى 1080 × 1080؟',
          a: 'بالتأكيد! يمكنك النقر على زر المقاس الشائع 1080 × 1080 مباشرة لتطبيق هذه الأبعاد في لحظة.',
        },
        {
          q: 'هل يمكنني إدخال أبعاد مخصصة؟',
          a: 'نعم، يمكنك كتابة أي أبعاد بالبكسل في خانتي العرض والارتفاع حسب رغبتك واحتياجك.',
        },
        {
          q: 'هل يتم رفع صوري إلى أي خادم خارجي؟',
          a: 'لا، إطلاقاً. معمارية الأداة تعمل 100% داخل ذاكرة متصفحك عبر واجهات Web APIs و Canvas دون أي إرسال للبيانات.',
        },
        {
          q: 'ما هي صيغ الصور المدعومة؟',
          a: 'تدعم الأداة صيغ JPG/JPEG و PNG و WebP بصورة كاملة مع إمكانية الاحتفاظ بنفس الصيغة أو التغيير بينها.',
        },
        {
          q: 'هل يمكنني تغيير حجم الصور الكبيرة جداً؟',
          a: 'نعم، تدعم الأداة الصور حتى 50 ميغابايت وحتى أبعاد 16,384 بكسل بأمان تام مع حماية الذاكرة من الاستنزاف.',
        },
      ],
      relatedToolsTitle: 'أدوات أخرى متاحة وقادمة',
      relatedToolsSubtitle: 'استكشف بقية أدوات الصور المتاحة لمعالجة ملفاتك بسهولة.',
    },
    converter: {
      title: 'تحويل صيغ الصور أونلاين مجاناً',
      subtitle: 'حوّل صورك بين JPG و PNG و WebP بدقة فائقة وخصوصية تامة 100% داخل المتصفح دون رفع الملفات إلى أي سيرفر.',
      badge: '100% محلي في المتصفح',
      dropzonePrompt: 'اختر الصورة أو اسحبها هنا لتحويل صيغتها فوراً',
      privacyNotice: 'معالجة محلية 100% • صورك لا تغادر جهازك أبداً',
      originalInfo: 'معلومات الملف الأصلي',
      originalFormat: 'الصيغة الأصلية',
      targetFormat: 'الصيغة المستهدفة',
      originalDimensions: 'الأبعاد الأصلية',
      originalSize: 'الحجم الأصلي',
      convertedSize: 'الحجم بعد التحويل',
      dimensionsPreserved: 'يتم الحفاظ على الأبعاد الأصلية بنسبة 100%',
      formatSettingsTitle: 'إعدادات تحويل الصيغة',
      formatSettingsSubtitle: 'اختر الصيغة المستهدفة وضبط خيارات الجودة والشفافية المناسبة',
      selectTargetFormat: 'اختر الصيغة الجديدة',
      formatJpeg: 'صورة JPG / JPEG',
      formatPng: 'صورة PNG (شفافة وعالية الدقة)',
      formatWebp: 'صورة WebP (حديثة ومضغوطة للويب)',
      formatJpegDesc: 'مثالية للصور الفوتوغرافية ومشاركتها مع الجميع (لا تدعم الشفافية).',
      formatPngDesc: 'تحافظ على الشفافية وجودة البكسل 100% بضغط غير فاقد للبيانات (Lossless).',
      formatWebpDesc: 'أحدث صيغة للويب توفر أحجاماً أصغر بكثير مع دعم الشفافية والجودة العالية.',
      qualityLabel: 'جودة الصورة الناتجة',
      qualityHelper: 'القيمة الموصى بها 85% تمنح توازناً مثالياً بين وضوح التفاصيل وصغر الحجم.',
      qualityWebpHelper: 'صيغة WebP توفر جودة ممتازة بحجم أقل بكثير مقارنة بـ JPEG.',
      pngLosslessNote: 'صيغة PNG تستخدم ضغطاً غير فاقد للبيانات (Lossless) للحفاظ التام على نقاء الصورة.',
      transparencyWarningTitle: 'ملاحظة حول الشفافية في صيغة JPEG',
      transparencyWarningDesc: 'صيغة JPEG لا تدعم الخلفيات الشفافة. سيتم استبدال المساحات الشفافة بلون الخلفية المحدد أدناه.',
      bgColorLabel: 'لون خلفية المساحات الشفافة',
      bgColorWhite: 'أبيض (افتراضي)',
      bgColorBlack: 'أسود',
      bgColorCustom: 'لون مخصص',
      sameFormatNotice: 'الصيغة المحددة مطابقة للصيغة الأصلية للصورة.',
      convertBtn: 'تحويل الصيغة الآن',
      convertingBtn: 'جارٍ التحويل في المتصفح...',
      stagePreparing: 'قراءة وفك تشفير الصورة...',
      stageConverting: 'تطبيق التحويل على مساحة الرسم...',
      stageEncoding: 'ترميز الملف بالصيغة الجديدة...',
      stageComplete: 'تم تحويل الصورة بنجاح!',
      resultTitle: 'اكتمل تحويل الصورة بنجاح',
      convertedLabel: 'الصورة المحولة',
      downloadBtn: 'تحميل الصورة المحولة',
      convertAnother: 'تحويل صورة أخرى',
      sizeReduced: 'تم تقليص الحجم بنسبة',
      sizeIncreased: 'زيادة الحجم بنسبة',
      sizeUnchanged: 'الحجم متطابق تقريباً',
      formatChange: 'تغيير الصيغة',
      howItWorksTitle: 'كيف يعمل محول صيغ الصور في المتصفح؟',
      howItWorksSubtitle: 'خطوات سريعة وبسيطة لتحويل صيغ صورك دون إرسالها لأي خادم خارجي.',
      step1Title: '1. اختر أو اسحب صورتك',
      step1Desc: 'ارفع ملف JPG أو PNG أو WebP. يتم فك تشفير الصورة مباشرة داخل ذاكرة متصفحك.',
      step2Title: '2. حدد الصيغة المستهدفة',
      step2Desc: 'اختر التحويل إلى JPG أو PNG أو WebP، واضبط مستوى الجودة أو لون الخلفية حسب رغبتك.',
      step3Title: '3. حمّل نسختك المحولة فوراً',
      step3Desc: 'انقر على "تحويل"، واستعرض النتيجة وقارن الحجمين، ثم حمّل الملف الجديد بنقرة واحدة.',
      whyChooseTitle: 'لماذا تختار محول الصور لدينا؟',
      whyChooseSubtitle: 'الأداة الأسرع والأكثر أماناً لتحويل الصيغ دون تعريض خصوصيتك للخطر.',
      benefit1Title: 'خصوصية كاملة 100%',
      benefit1Desc: 'لا يتم إرسال أي بكسل من صورتك إلى أي سيرفر أو خدمة سحابية خارجية، كل شيء يتم محلياً.',
      benefit2Title: 'معالجة فورية بدون انتظار',
      benefit2Desc: 'لا توجد أوقات انتظار للرفع أو التنزيل؛ تعمل محركات الويب المتقدمة بسرعة جهازك القصوى.',
      benefit3Title: 'حفاظ تام على دقة الأبعاد',
      benefit3Desc: 'يحافظ المحول على أبعاد الصورة الأصلية ونقاء بكسلاتها بدقة متناهية دون تشويه.',
      matrixTitle: 'جدول مقارنة الصيغ الشائعة',
      matrixSubtitle: 'دليل سريع لمساعدتك في اختيار أفضل صيغة لاحتياجاتك.',
      faqTitle: 'الأسئلة الشائعة حول تحويل الصور',
      faqSubtitle: 'إجابات واضحة ومباشرة لكل ما يخص تحويل وتصدير صيغ الصور الرقمية.',
      faqItems: [
        {
          q: 'كيف أقوم بتحويل صيغة صورة؟',
          a: 'كل ما عليك هو سحب الصورة إلى صندوق الرفع، واختيار الصيغة المستهدفة (JPG أو PNG أو WebP)، ثم الضغط على زر "تحويل الصيغة الآن" وتحميل الملف الناتج.',
        },
        {
          q: 'هل يمكنني تحويل PNG إلى JPG؟',
          a: 'نعم، بكل سهولة. وإذا كانت صورة PNG تحتوي على خلفية شفافة، يمكنك اختيار لون خلفية (مثل الأبيض) لملء الشفافية بأمان.',
        },
        {
          q: 'هل يمكنني تحويل JPG إلى WebP؟',
          a: 'نعم، تحويل JPG إلى WebP يقلص حجم الملف بنسبة تتراوح عادة بين 25% و 40% مع الحفاظ على نفس جودة المشاهدة، مما يجعله مثالياً لتسريع المواقع.',
        },
        {
          q: 'هل يمكنني تحويل WebP إلى PNG أو JPG؟',
          a: 'نعم، تدعم الأداة التحويل من WebP إلى كل من PNG عالي النقاء أو JPG المتوافق مع كافة البرامج والأجهزة القديمة.',
        },
        {
          q: 'ماذا يحدث للمساحات الشفافة عند التحويل إلى JPG؟',
          a: 'نظراً لأن معيار JPG لا يدعم قناة الشفافية (Alpha Channel)، يقوم المحول بتعبئة الشفافية بلون الخلفية المختار (الافتراضي هو اللون الأبيض).',
        },
        {
          q: 'هل يتغير حجم أبعاد الصورة عند تحويل صيغتها؟',
          a: 'كلا، يحتفظ المحول بنفس أبعاد العرض والارتفاع الأصلية بالبكسل دون أي تغيير.',
        },
        {
          q: 'هل ترسلون صوري إلى أي خادم خارجي؟',
          a: 'مطلقاً. جميع عمليات التحويل تتم بالكامل في ذاكرة متصفحك عبر واجهات HTML5 Canvas البرمجية.',
        },
        {
          q: 'هل أداة تحويل الصور مجانية وبدون حدود؟',
          a: 'نعم، الأداة مجانية بالكامل بنسبة 100% ولا تتطلب أي تسجيل أو اشتراك، وتتيح لك تحويل عدد غير محدود من الصور.',
        },
      ],
      relatedToolsTitle: 'أدوات أخرى لمعالجة الصور',
      relatedToolsSubtitle: 'استكشف أدواتنا المرافقة لتعديل وضغط وقص صورك بسهولة وأمان.',
    },
    cropper: {
      title: 'قص وتأطير الصور أونلاين',
      subtitle: 'قص صورك وتحديد أبعادها بنسب ثابتة أو حرة وبدقة متناهية 100% داخل المتصفح دون رفع أي ملف.',
      badge: 'قص فوري وآمن داخل المتصفح',
      dropzonePrompt: 'اسحب صورة هنا أو انقر لاختيارها لبدء القص والتأطير',
      privacyNotice: 'تتم عملية القص والتصدير بالكامل في ذاكرة متصفحك دون رفع صورك لأي سيرفر.',
      originalInfo: 'معلومات الصورة الأصلية',
      originalDimensions: 'الأبعاد الأصلية',
      croppedDimensions: 'أبعاد منطقة القص',
      cropSelection: 'محدد منطقة القص',
      cropBoxInfo: 'حرك المستطيل أو اسحب الزوايا لتعديل التحديد',
      aspectRatioTitle: 'نسبة الأبعاد المحددة',
      aspectRatioSubtitle: 'اختر نسبة ثابتة لتأطير مثالي لشبكات التواصل الاجتماعي أو استخدم القص الحر.',
      aspectRatioFree: 'حر (مخصص)',
      aspectRatioSquare: '1:1 (مربع)',
      aspectRatio43: '4:3 (قياسي)',
      aspectRatio169: '16:9 (عريض)',
      aspectRatio916: '9:16 (عمودي / ستوري)',
      aspectRatioFreeDesc: 'تحديد حر لأي أبعاد حسب رغبتك',
      aspectRatioSquareDesc: 'مثالي لصور البروفايل وإنستغرام',
      aspectRatio43Desc: 'نسبة قياسية لشاشات العرض والصور',
      aspectRatio169Desc: 'مناسب لليوتيوب وأغلفة المواقع',
      aspectRatio916Desc: 'مثالي للقصص وريلز وتيك توك',
      rotateLabel: 'تدوير الصورة',
      rotate90: 'تدوير 90°',
      rotateReset: 'إعادة ضبط الزاوية',
      centerCropBtn: 'توسيط منطقة القص',
      fitImageBtn: 'تحديد كامل الصورة',
      outputSettingsTitle: 'إعدادات الحفظ والتصدير',
      outputSettingsSubtitle: 'حدد صيغة ومستوى جودة الصورة المقصوصة.',
      outputFormat: 'صيغة الصورة الناتجة',
      formatOriginal: 'نفس الصيغة الأصلية',
      formatJpeg: 'صيغة JPG',
      formatPng: 'صيغة PNG (نقاء فائق)',
      formatWebp: 'صيغة WebP (حجم مثالي)',
      qualityLabel: 'مستوى الجودة للضغط',
      qualityHelper: 'القيمة الموصى بها 90% تضمن وضوحاً فائقاً للتفاصيل.',
      pngLosslessNote: 'صيغة PNG غير فاقدة للبيانات وتحافظ على كامل النقاء والشفافية.',
      cropBtn: 'قص وتصدير الصورة الآن',
      croppingBtn: 'جارٍ استخراج منطقة القص في المتصفح...',
      stagePreparing: 'قراءة وفك تشفير الصورة...',
      stageCropping: 'قص البكسلات المحددة بدقة عالية...',
      stageEncoding: 'ترميز وتوليد ملف الصورة الجديد...',
      stageComplete: 'تم قص الصورة بنجاح!',
      resultTitle: 'اكتمل قص الصورة وتأطيرها بنجاح',
      croppedLabel: 'الصورة المقصوصة',
      downloadBtn: 'تحميل الصورة المقصوصة',
      cropAnother: 'قص صورة أخرى',
      howItWorksTitle: 'كيف يعمل قص الصور في المتصفح؟',
      howItWorksSubtitle: '3 خطوات سهلة لتأطير وقص أجزاء صورك دون إرسالها لأي جهة.',
      step1Title: '1. اختر أو اسحب صورتك',
      step1Desc: 'ارفع صورتك بصيغة JPG أو PNG أو WebP؛ يتم تحميلها فوراً في ذاكرة جهازك.',
      step2Title: '2. حدد منطقة ونسبة القص',
      step2Desc: 'اختر نسبة الأبعاد (1:1، 16:9، إلخ) واسحب مستطيل التحديد على الجزء المطلوب.',
      step3Title: '3. حمّل نسختك المقصوصة',
      step3Desc: 'اضغط على "قص وتصدير الصورة" وحمّل الملف النظيف بدقته المحددة في الحال.',
      whyChooseTitle: 'لماذا تختار أداة قص الصور لدينا؟',
      whyChooseSubtitle: 'الأداة الأسهل والأسرع والأكثر أماناً لتأطير صورك بجودة احترافية.',
      benefit1Title: 'سرية وأمان بنسبة 100%',
      benefit1Desc: 'لا يتم إرسال أي صورة إلى سيرفرات خارجية، كل شيء يعمل بأمان تام على جهازك.',
      benefit2Title: 'دقة متناهية بالبكسل',
      benefit2Desc: 'يتم استخراج البكسلات بأعلى نقاء وبدون أي تشويه أو ضغط إضافي غير مرغوب.',
      benefit3Title: 'توافق كامل مع الهواتف والحواسيب',
      benefit3Desc: 'واجهة متجاوبة وسلسة تدعم السحب باللمس على شاشات الهواتف والأجهزة اللوحية.',
      faqTitle: 'الأسئلة الشائعة حول قص وتأطير الصور',
      faqSubtitle: 'إجابات شاملة لجميع تساؤلاتك حول أداة القص ونسب الأبعاد المدعومة.',
      faqItems: [
        {
          q: 'كيف أقوم بقص صورة أونلاين مجاناً؟',
          a: 'قم برفع الصورة، وحدد منطقة القص بتحريك المربع أو اختيار نسبة الأبعاد المطلوبة (مثل 1:1 أو 16:9)، ثم اضغط على زر "قص وتصدير الصورة" لتنزيلها فوراً.',
        },
        {
          q: 'هل يمكنني قص الصورة بنسبة مربعة 1:1 لإنستغرام؟',
          a: 'نعم، ما عليك سوى اختيار النسبة 1:1 وسيقوم المحرر بقفل النسبة تلقائياً لتتمكن من تحديد وتوسيط أي جزء بشكل مربع مثالي.',
        },
        {
          q: 'هل تقل جودة الصورة بعد القص؟',
          a: 'كلا، تظل جودة البكسلات داخل المنطقة المقصوصة بنفس النقاء الأصلي بنسبة 100% دون أي تخفيض جودة إجباري.',
        },
        {
          q: 'ما هي الصيغ المدعومة في أداة القص؟',
          a: 'تدعم الأداة جميع الصيغ الشائعة: JPG و PNG و WebP، ويمكنك تصدير النتيجة بنفس الصيغة الأصلية أو التحويل لصيغة أخرى.',
        },
        {
          q: 'هل تعمل أداة القص على الهواتف والأجهزة اللوحية؟',
          a: 'نعم بالتأكيد، صُممت واجهة القص بنظام تحكم ذكي يعمل باللمس مع مقابض سهلة السحب على كافة مقاسات الشاشات.',
        },
        {
          q: 'هل يتم رفع صوري إلى أي خادم خارجي؟',
          a: 'إطلاقاً. تتم كل مراحل فك التشفير والقص والتصدير داخل ذاكرة المتصفح عبر HTML5 Canvas API.',
        },
        {
          q: 'هل الأداة مجانية وبدون علامات مائية؟',
          a: 'نعم، مجانية تماماً وبدون أي علامة مائية أو قيود على عدد الصور.',
        },
      ],
      relatedToolsTitle: 'أدوات أخرى لمعالجة الصور',
      relatedToolsSubtitle: 'استكشف أدواتنا المرافقة لضغط وتعديل حجم وتحويل صيغ صورك بسهولة وأمان.',
    },
  },
  fr: {
    brand: {
      name: 'Image Tools',
      tagline: '100% Dans le Navigateur',
      zeroUploads: 'Aucun Envoi sur Serveur',
      processingNote: 'Tout le traitement a lieu localement sur votre appareil.',
    },
    nav: {
      compress: 'Compresser',
      resize: 'Redimensionner',
      convert: 'Convertir',
      crop: 'Recadrer',
      compressDesc: 'Réduisez la taille des fichiers JPG, PNG et WebP',
      resizeDesc: 'Ajustez dimensions et proportions en pixels',
      convertDesc: 'Changez de format entre JPG, PNG et WebP',
      cropDesc: 'Découpez vos images avec ratios prédéfinis',
    },
    theme: {
      toggle: 'Changer de thème',
      light: 'Mode Clair',
      dark: 'Mode Sombre',
      switchToDark: 'Passer au mode sombre',
      switchToLight: 'Passer au mode clair',
    },
    lang: {
      select: 'Changer de langue',
      arabic: 'العربية',
      french: 'Français',
      english: 'English',
    },
    hero: {
      badge: 'Traitement instantané dans le navigateur',
      titleStart: 'Optimisez vos images ',
      titleHighlight: 'en quelques secondes',
      subtitle:
        'Outils en ligne gratuits, rapides et privés pour compresser, redimensionner, convertir et recadrer vos photos directement sur votre appareil.',
      features: 'Sans inscription • Zéro envoi sur serveur • Utilisation illimitée',
    },
    dropzone: {
      title: 'Sélectionnez une image ou glissez-la ici',
      subtitle: 'Prend en charge JPG, PNG et WebP jusqu’à 50 Mo. Traitement instantané local.',
      pill1: '100% Local',
      pill2: 'Zéro Envoi Serveur',
      pill3: 'Sans Inscription',
      changeFile: 'Changer d’image',
      selectToolPrompt: 'Sélectionnez l’outil à appliquer :',
      tools: {
        compress: 'Compresser',
        compressDesc: 'Réduire le poids',
        resize: 'Redimensionner',
        resizeDesc: 'Changer dimensions',
        convert: 'Convertir',
        convertDesc: 'Changer de format',
        crop: 'Recadrer',
        cropDesc: 'Découpage et ratios',
      },
      alertImageOnly: 'Veuillez sélectionner un fichier image valide (JPG, PNG ou WebP).',
    },
    popularTools: {
      title: 'Outils Principaux',
      subtitle: 'Choisissez un outil optimisé pour votre tâche d’édition d’image.',
      openTool: 'Ouvrir l’outil',
    },
    trust: {
      title: 'Pourquoi Choisir Image Tools ?',
      subtitle: 'Conçu dès le départ pour la confidentialité, la performance et la simplicité.',
      p1Title: 'Confidentialité 100% Côté Client',
      p1Desc:
        'Vos images ne quittent jamais votre ordinateur ou téléphone. Le traitement utilise la mémoire de votre navigateur via HTML5 Canvas.',
      p2Title: 'Vitesse & Exécution Instantanée',
      p2Desc:
        'Évitez les téléversements lents sur internet et les files d’attente. Ajustements immédiats et téléchargement instantané.',
      p3Title: 'Sans Compte, Sans Publicité Intrusive',
      p3Desc:
        'Pas d’e-mail requis, aucun mot de passe, pas de restriction cachée. Un outil simple et transparent pour vos besoins quotidiens.',
    },
    howItWorks: {
      title: 'Comment ça marche ?',
      subtitle: 'Trois étapes faciles sans logiciel à installer.',
      step1Title: '1. Choisissez votre image',
      step1Desc: 'Glissez-déposez votre fichier dans la zone ou parcourez votre appareil.',
      step2Title: '2. Ajustez vos paramètres',
      step2Desc: 'Réglez la compression, redimensionnez les pixels ou choisissez le format.',
      step3Title: '3. Téléchargez instantanément',
      step3Desc: 'Cliquez sur télécharger pour enregistrer votre fichier optimisé immédiatement.',
    },
    popularTasks: {
      title: 'Tâches Fréquentes',
      subtitle: 'Raccourcis rapides pour vos besoins photographiques les plus courants.',
      startTask: 'Lancer la tâche',
      tasks: [
        {
          tag: 'Compression',
          title: 'Compresser JPG pour le Web',
          desc: 'Réduisez la taille des images jusqu’à 80% pour accélérer les pages web.',
        },
        {
          tag: 'Format Moderne',
          title: 'Convertir en WebP',
          desc: 'Transformez des PNG et JPG en WebP léger de haute qualité.',
        },
        {
          tag: 'Réseaux Sociaux',
          title: 'Redimensionner pour Instagram',
          desc: 'Ajustez les résolutions selon les formats recommandés pour les réseaux.',
        },
        {
          tag: 'Proportions',
          title: 'Recadrage Carré 1:1',
          desc: 'Découpage idéal pour avatars, miniatures et fiches produits.',
        },
      ],
    },
    faq: {
      title: 'Foire Aux Questions',
      subtitle: 'Tout ce que vous devez savoir sur nos utilitaires d’images en navigateur.',
      items: [
        {
          q: 'Mes images sont-elles envoyées sur votre serveur ?',
          a: 'Jamais. Image Tools s’appuie sur les API HTML5 Canvas et Web du navigateur. Tout le traitement reste confiné à votre mémoire locale.',
        },
        {
          q: 'Le service est-il vraiment gratuit ?',
          a: 'Oui, 100% gratuit sans frais cachés, sans période d’essai et sans filigrane sur vos images.',
        },
        {
          q: 'Dois-je créer un compte ?',
          a: 'Aucune inscription n’est requise. Sélectionnez votre image, effectuez vos réglages et téléchargez.',
        },
        {
          q: 'Quels formats sont pris en charge ?',
          a: 'Nous supportons JPG/JPEG, PNG et WebP, couvrant plus de 98% des besoins standards.',
        },
        {
          q: 'Y a-t-il une limite de taille ?',
          a: 'Comme le traitement a lieu sur votre appareil, il n’y a pas de limite serveur. Nous recommandons des fichiers jusqu’à 50 Mo pour un confort optimal.',
        },
      ],
    },
    footer: {
      desc: 'Utilitaires d’images en ligne gratuits, rapides et confidentiels. Compressez, redimensionnez, convertissez et recadrez vos photos sans envoi sur serveur.',
      privacyBadge: 'Vos fichiers ne quittent jamais votre appareil. 100% client-side.',
      toolsTitle: 'Outils d’Image',
      whyTitle: 'Avantages',
      noReg: 'Aucune inscription requise',
      speed: 'Vitesses locales instantanées',
      zeroLogs: 'Zéro journalisation ou stockage',
      copyright: 'Tous droits réservés. Outils d’image gratuits côté client.',
      privacyFirst: 'Architecture axée sur la confidentialité',
      cloudflare: 'Compatible hébergement statique',
    },
    common: {
      comingSoon: 'Bientôt disponible',
      phase: 'Phase',
      phase2Note: 'Cet outil est en cours de développement et sera disponible dans la prochaine phase.',
      browse: 'Parcourir les fichiers',
      dragAndDrop: 'ou glissez-déposez le fichier ici',
      dropHere: 'Déposez le fichier pour le charger',
      fileSelected: 'Fichier sélectionné avec succès',
      remove: 'Supprimer',
      maxSize: 'Taille maximale',
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      reset: 'Réinitialiser',
      download: 'Télécharger',
      apply: 'Appliquer',
      cancel: 'Annuler',
      close: 'Fermer',
      home: 'Accueil',
      allTools: 'Tous les outils',
      ready: 'Prêt',
      inProgress: 'En cours',
      invalidMime: 'Format non pris en charge. Veuillez choisir un fichier JPG, PNG ou WebP.',
      fileTooLarge: 'Fichier trop volumineux. La taille maximale recommandée est de 50 Mo.',
    },
    compressor: {
      title: 'Compresser une Image en Ligne',
      subtitle: 'Réduisez le poids de vos images JPG, PNG et WebP sans perte visible de qualité. Traitement 100% privé dans votre navigateur.',
      badge: 'Outil Actif — Phase 2',
      dropzonePrompt: 'Glissez ou sélectionnez une image à compresser',
      originalLabel: 'Image originale',
      compressedLabel: 'Image compressée',
      settingsTitle: 'Options de Compression',
      modeQuality: 'Par Qualité',
      modeTarget: 'Taille Cible (Target Size)',
      qualityLabel: 'Niveau de Qualité',
      qualityHelper: 'La valeur recommandée de 80% offre un équilibre optimal entre légèreté et fidélité visuelle.',
      targetSizeLabel: 'Taille Cible Approximative',
      targetSizeDisclaimer: 'Note : La taille finale est approximative car l’encodage varie selon le contenu de l’image.',
      preset100kb: '100 Ko',
      preset200kb: '200 Ko',
      preset500kb: '500 Ko',
      customTarget: 'Personnalisée',
      customKbPlaceholder: 'Ex : 150',
      compressBtn: 'Compresser l’Image',
      compressingBtn: 'Compression en cours...',
      stageDecoding: 'Décodage de l’image en mémoire...',
      stageCompressing: 'Application de l’algorithme de compression...',
      stageEvaluating: 'Ajustement itératif de la taille cible...',
      stageFinalizing: 'Génération du résultat...',
      stageComplete: 'Compression terminée avec succès !',
      resultTitle: 'Résultat de la Compression',
      originalSize: 'Taille originale',
      compressedSize: 'Taille compressée',
      saved: 'Économisé',
      dimensions: 'Dimensions',
      format: 'Format',
      qualityUsed: 'Qualité appliquée',
      downloadBtn: 'Télécharger l’Image Compressée',
      compressAnother: 'Compresser une autre image',
      targetAchievedNote: 'Taille cible atteinte avec succès.',
      targetNotAchievedNote: 'La taille cible est indicative. Meilleur résultat obtenu sans altérer les dimensions.',
      pngLosslessNote: 'Format PNG : L’encodage natif du navigateur pour le PNG est sans perte. Pour une réduction drastique, privilégiez le format WebP ou JPG.',
      privacyNotice: 'Traitement 100% local sur votre machine via Canvas. Aucune image n’est transmise à un serveur.',
      howItWorksTitle: 'Comment Fonctionne la Compression ?',
      howItWorksSubtitle: 'Trois étapes simples et instantanées, sans installation ni compte requis.',
      step1Title: '1. Choisissez votre Image',
      step1Desc: 'Glissez-déposez un fichier JPG, PNG ou WebP ou parcourez vos dossiers.',
      step2Title: '2. Ajustez les Paramètres',
      step2Desc: 'Choisissez entre le curseur de qualité ou une taille cible en Ko (100 Ko, 200 Ko, 500 Ko).',
      step3Title: '3. Téléchargez le Résultat',
      step3Desc: 'Cliquez sur Compresser et téléchargez instantanément votre image allégée.',
      whyChooseTitle: 'Pourquoi Choisir Notre Compresseur ?',
      whyChooseSubtitle: 'Confidentialité totale et rapidité inégalée.',
      benefit1Title: 'Confidentialité 100% Client-Side',
      benefit1Desc: 'Vos photos ne quittent jamais votre ordinateur ou téléphone. Le traitement a lieu dans la mémoire vive de votre navigateur.',
      benefit2Title: 'Vitesse Instantanée',
      benefit2Desc: 'Pas d’attente de téléversement ni de file d’attente sur un serveur distant.',
      benefit3Title: 'Jusqu’à 85% d’Espace Économisé',
      benefit3Desc: 'Allégez vos pages web, envoyez facilement vos pièces jointes par e-mail et gagnez de la place.',
      faqTitle: 'Foire Aux Questions sur la Compression',
      faqSubtitle: 'Tout ce que vous devez savoir sur le fonctionnement technique.',
      faqItems: [
        {
          q: 'Comment fonctionne la compression d’image ?',
          a: 'L’outil charge votre image dans un élément Canvas local et applique l’encodeur natif du navigateur avec des paramètres de quantification optimisés pour réduire les octets superflus.',
        },
        {
          q: 'Mon image est-elle envoyée sur un serveur ?',
          a: 'Jamais. Notre application fonctionne intégralement dans votre navigateur. Vos données et photos restent strictement sur votre appareil.',
        },
        {
          q: 'Puis-je compresser des images JPEG ?',
          a: 'Oui, le format JPEG bénéficie de taux de réduction exceptionnels tout en conservant une netteté remarquable.',
        },
        {
          q: 'Puis-je compresser des images PNG ?',
          a: 'Oui, les PNG sont pris en charge. Toutefois, l’encodage canvas pour PNG étant sans perte (lossless), la réduction est plus modérée qu’avec JPEG ou WebP.',
        },
        {
          q: 'Puis-je viser une taille exacte de 100 Ko, 200 Ko ou 500 Ko ?',
          a: 'Oui, grâce au mode Taille Cible. L’algorithme teste par dichotomie les niveaux de compression optimaux pour approcher au plus près le volume demandé.',
        },
        {
          q: 'Y a-t-il une perte de qualité visible ?',
          a: 'À un niveau de qualité de 80%, la différence avec l’image originale est quasiment imperceptible à l’œil nu.',
        },
        {
          q: 'Qu’advient-il de mon fichier original ?',
          a: 'Votre fichier original reste intact sur votre disque. L’image compressée est téléchargée comme un nouveau fichier.',
        },
        {
          q: 'L’outil est-il gratuit ?',
          a: 'Oui, totalement gratuit, sans inscription, sans filigrane et sans limite d’utilisation.',
        },
        {
          q: 'Quels formats sont compatibles ?',
          a: 'Actuellement, les formats JPG, PNG et WebP sont entièrement pris en charge.',
        },
      ],
      relatedToolsTitle: 'Outils Associés à Venir',
      relatedToolsSubtitle: 'Découvrez les prochaines fonctionnalités en cours de développement.',
    },
    resizer: {
      title: 'Redimensionner une Image en Ligne',
      subtitle: 'Modifiez la largeur et la hauteur de vos images JPG, PNG et WebP en pixels avec verrouillage des proportions, 100% dans votre navigateur.',
      badge: '100% Local dans le Navigateur',
      dropzonePrompt: 'Sélectionnez une image à redimensionner',
      originalInfo: 'Informations de l’Image Originale',
      originalDimensions: 'Dimensions d’origine',
      resizedDimensions: 'Nouvelles dimensions',
      originalSize: 'Poids d’origine',
      resizedSize: 'Poids final',
      fileType: 'Format du fichier',
      dimensionsSettings: 'Paramètres des Dimensions',
      widthLabel: 'Largeur',
      heightLabel: 'Hauteur',
      aspectRatioLock: 'Conserver les proportions',
      aspectRatioUnlock: 'Libérer les proportions',
      aspectRatioLockedHint: 'Proportions verrouillées : la modification d’une valeur ajuste automatiquement l’autre',
      aspectRatioUnlockedHint: 'Proportions libres : la largeur et la hauteur peuvent être modifiées indépendamment',
      popularDimensionsTitle: 'Dimensions Fréquentes',
      popularDimensionsSubtitle: 'Préréglages rapides pour les formats les plus utilisés',
      presetSquare: '1080 × 1080 (Carré)',
      presetLandscapeFHD: '1920 × 1080 (Plein écran FHD)',
      presetLandscapeHD: '1280 × 720 (Paysage HD)',
      presetPortrait: '1080 × 1350 (Portrait 4:5)',
      presetStory: '1080 × 1920 (Vertical 9:16)',
      presetCustom: 'Personnalisé',
      presetRatioMismatchNote: 'Dimensions appliquées directement sans aucun recadrage de votre image.',
      outputSettings: 'Paramètres de Sortie et Qualité',
      outputFormat: 'Format de sortie',
      formatOriginal: 'Conserver le format d’origine',
      formatJpeg: 'JPG / JPEG',
      formatPng: 'PNG',
      formatWebp: 'WebP',
      qualityLabel: 'Qualité d’exportation',
      qualityHelper: 'Recommandé : 85% pour un rendu visuel net et un poids optimisé.',
      pngLosslessNote: 'Le format PNG utilise une compression sans perte dans le navigateur ; le curseur de qualité ne s’applique pas au PNG.',
      resizeBtn: 'Redimensionner l’Image',
      resizingBtn: 'Redimensionnement en cours...',
      stagePreparing: 'Préparation de l’image en mémoire...',
      stageResizing: 'Redimensionnement et lissage des pixels...',
      stageEncoding: 'Encodage du fichier final...',
      stageComplete: 'Image redimensionnée avec succès !',
      resultTitle: 'Image Redimensionnée avec Succès',
      downloadBtn: 'Télécharger l’Image Redimensionnée',
      resizeAnother: 'Redimensionner une autre image',
      sizeDifference: 'Différence de poids',
      validationMinSize: 'Chaque dimension doit être d’au moins 1 pixel.',
      validationMaxSize: 'Les dimensions dépassent la limite sécurisée du navigateur (16 384 px).',
      validationMaxPixels: 'La résolution totale dépasse le seuil de mémoire du navigateur (64 mégapixels).',
      howItWorksTitle: 'Comment Fonctionne le Redimensionnement ?',
      howItWorksSubtitle: 'Trois étapes rapides et simples, directement dans votre navigateur.',
      step1Title: '1. Choisissez votre Image',
      step1Desc: 'Sélectionnez ou glissez-déposez une photo JPG, PNG ou WebP depuis votre appareil.',
      step2Title: '2. Ajustez les Dimensions',
      step2Desc: 'Indiquez la largeur et la hauteur souhaitées en pixels ou choisissez un format populaire avec verrouillage des proportions.',
      step3Title: '3. Téléchargez le Fichier',
      step3Desc: 'Cliquez sur Redimensionner et récupérez immédiatement votre fichier sans aucun temps de transfert serveur.',
      whyChooseTitle: 'Pourquoi Utiliser Notre Outil de Redimensionnement ?',
      whyChooseSubtitle: 'Rapidité d’exécution, respect absolu de la vie privée et haute fidélité visuelle.',
      benefit1Title: 'Confidentialité Totale 100%',
      benefit1Desc: 'Vos photos ne quittent jamais votre terminal. Le traitement s’exécute entièrement dans la mémoire de votre navigateur.',
      benefit2Title: 'Interpolation Haute Fidélité',
      benefit2Desc: 'Lissage bicubique haute précision garantissant des contours nets lors des réductions et agrandissements.',
      benefit3Title: 'Verrouillage Intelligent',
      benefit3Desc: 'Conserve le ratio naturel de votre image pour éviter toute distorsion ou déformation visuelle.',
      faqTitle: 'Foire Aux Questions sur le Redimensionnement',
      faqSubtitle: 'Tout ce que vous devez savoir sur le redimensionnement d’images dans Image Tools.',
      faqItems: [
        {
          q: 'Comment redimensionner une image ?',
          a: 'Importez votre image, saisissez les nouvelles dimensions en pixels (ou cliquez sur un format prédéfini), puis cliquez sur Redimensionner l’Image pour télécharger le résultat.',
        },
        {
          q: 'Le redimensionnement coupe-t-il (recadre) l’image ?',
          a: 'Non, redimensionner consiste à recalculer l’échelle globale de l’image. Aucun élément n’est découpé ou supprimé.',
        },
        {
          q: 'Le redimensionnement réduit-il la qualité de l’image ?',
          a: 'Nous utilisons un algorithme de lissage de haute qualité (imageSmoothingQuality). Réduire les dimensions préserve une excellente netteté.',
        },
        {
          q: 'Puis-je conserver le ratio d’aspect original ?',
          a: 'Oui, le cadenas de verrouillage des proportions est activé par défaut. Dès que vous modifiez la largeur, la hauteur s’ajuste proportionnellement.',
        },
        {
          q: 'Puis-je redimensionner une image en 1080 × 1080 ?',
          a: 'Absolument. Cliquez simplement sur le préréglage 1080 × 1080 dans les dimensions fréquentes pour appliquer ces cotes instantanément.',
        },
        {
          q: 'Puis-je utiliser des dimensions personnalisées ?',
          a: 'Oui, vous pouvez saisir manuellement les pixels exacts de votre choix dans les champs Largeur et Hauteur.',
        },
        {
          q: 'Mes images sont-elles envoyées sur un serveur ?',
          a: 'Jamais. Notre architecture est 100% côté client. Vos fichiers ne sont ni transférés ni conservés en ligne.',
        },
        {
          q: 'Quels formats d’images sont supportés ?',
          a: 'Les formats JPG, PNG et WebP sont entièrement pris en charge en entrée comme en sortie.',
        },
        {
          q: 'Puis-je redimensionner de très grandes images ?',
          a: 'Oui, les images jusqu’à 50 Mo et 16 384 pixels sont acceptées grâce aux mécanismes de protection mémoire du navigateur.',
        },
      ],
      relatedToolsTitle: 'Autres Outils Disponibles et à Venir',
      relatedToolsSubtitle: 'Explorez nos utilitaires photo complémentaires pour préparer vos visuels.',
    },
    converter: {
      title: 'Convertisseur d’Images Gratuit en Ligne',
      subtitle: 'Convertissez instantanément vos fichiers entre JPG, PNG et WebP avec une fidélité maximale et zéro envoi sur serveur.',
      badge: '100% Local Navigateur',
      dropzonePrompt: 'Sélectionnez une image ou glissez-la ici pour la convertir',
      privacyNotice: 'Traitement 100% local • Vos fichiers restent sur votre appareil',
      originalInfo: 'Fichier source',
      originalFormat: 'Format d’origine',
      targetFormat: 'Format cible',
      originalDimensions: 'Dimensions d’origine',
      originalSize: 'Taille d’origine',
      convertedSize: 'Taille convertie',
      dimensionsPreserved: 'Dimensions 100% préservées',
      formatSettingsTitle: 'Paramètres de conversion',
      formatSettingsSubtitle: 'Sélectionnez le format cible et réglez la qualité ou la transparence',
      selectTargetFormat: 'Choisir le format de destination',
      formatJpeg: 'Image JPG / JPEG',
      formatPng: 'Image PNG (Haute fidélité & Transparence)',
      formatWebp: 'Image WebP (Moderne & Optimisée Web)',
      formatJpegDesc: 'Idéal pour les photographies et une compatibilité maximale (pas de transparence).',
      formatPngDesc: 'Préserve 100% de la transparence et des détails avec compression sans perte (lossless).',
      formatWebpDesc: 'Format moderne ultra-léger pour le web avec transparence et haute qualité.',
      qualityLabel: 'Qualité d’exportation',
      qualityHelper: 'Une valeur de 85% offre le meilleur compromis netteté / compression.',
      qualityWebpHelper: 'Le WebP offre un fichier nettement plus compact que le JPEG à qualité égale.',
      pngLosslessNote: 'Le format PNG applique une compression sans perte (lossless) sans altération de pixels.',
      transparencyWarningTitle: 'Gestion de la transparence en JPG',
      transparencyWarningDesc: 'Le format JPG ne supporte pas la transparence. Les zones transparentes seront remplies avec la couleur d’arrière-plan choisie.',
      bgColorLabel: 'Couleur de fond pour la transparence',
      bgColorWhite: 'Blanc (Recommandé)',
      bgColorBlack: 'Noir',
      bgColorCustom: 'Personnalisée',
      sameFormatNotice: 'Le format choisi est identique au format d’origine.',
      convertBtn: 'Convertir l’Image',
      convertingBtn: 'Conversion locale en cours...',
      stagePreparing: 'Chargement et décodage...',
      stageConverting: 'Application du format sur le canevas...',
      stageEncoding: 'Encodage du fichier de sortie...',
      stageComplete: 'Conversion terminée avec succès !',
      resultTitle: 'Image Convertie avec Succès',
      convertedLabel: 'Image Convertie',
      downloadBtn: 'Télécharger l’Image Convertie',
      convertAnother: 'Convertir une autre image',
      sizeReduced: 'Taille réduite de',
      sizeIncreased: 'Taille augmentée de',
      sizeUnchanged: 'Taille quasi identique',
      formatChange: 'Changement de format',
      howItWorksTitle: 'Comment fonctionne notre convertisseur ?',
      howItWorksSubtitle: '3 étapes faciles pour changer le format de vos visuels en toute confidentialité.',
      step1Title: '1. Importez votre image',
      step1Desc: 'Déposez une photo JPG, PNG ou WebP. Le fichier est lu dans la mémoire vive de votre navigateur.',
      step2Title: '2. Choisissez le format',
      step2Desc: 'Sélectionnez JPG, PNG ou WebP, et ajustez la qualité ou la couleur de fond si nécessaire.',
      step3Title: '3. Téléchargez instantanément',
      step3Desc: 'Cliquez sur Convertir, observez le gain d’espace et téléchargez votre nouveau fichier.',
      whyChooseTitle: 'Pourquoi utiliser notre outil ?',
      whyChooseSubtitle: 'La solution la plus rapide, sécurisée et respectueuse de votre vie privée.',
      benefit1Title: 'Confidentialité Totale',
      benefit1Desc: 'Vos fichiers ne transitent par aucun serveur externe. Tout s’exécute sur votre machine.',
      benefit2Title: 'Vitesse Instantanée',
      benefit2Desc: 'Aucun temps d’attente d’upload ou de download réseau : traitement à la vitesse du processeur.',
      benefit3Title: 'Dimensions Intactes',
      benefit3Desc: 'Les dimensions exactes en pixels et la netteté sont conservées sans déformation.',
      matrixTitle: 'Tableau Comparatif des Formats',
      matrixSubtitle: 'Un guide pratique pour choisir le meilleur format selon vos besoins.',
      faqTitle: 'Questions Fréquentes sur la Conversion',
      faqSubtitle: 'Tout ce que vous devez savoir pour convertir vos photos en toute simplicité.',
      faqItems: [
        {
          q: 'Comment convertir une image gratuitement ?',
          a: 'Glissez votre fichier dans la zone d’import, sélectionnez le format désiré (JPG, PNG ou WebP), puis cliquez sur "Convertir l’Image" et téléchargez le résultat.',
        },
        {
          q: 'Puis-je convertir un PNG avec transparence en JPG ?',
          a: 'Oui. Comme le JPG ne gère pas la transparence, vous pouvez choisir la couleur de fond souhaitée (le blanc par défaut).',
        },
        {
          q: 'Pourquoi convertir du JPG en WebP ?',
          a: 'Le format WebP réduit généralement le poids du fichier de 25% à 35% par rapport au JPEG à qualité visuelle équivalente, accélérant le chargement de vos pages web.',
        },
        {
          q: 'Puis-je convertir du WebP en PNG ou JPG ?',
          a: 'Oui, notre outil convertit facilement les fichiers WebP vers PNG (pour conserver la transparence) ou vers JPG pour une compatibilité universelle.',
        },
        {
          q: 'Mes fichiers sont-ils envoyés sur un serveur ?',
          a: 'Non, aucun fichier n’est envoyé sur un serveur. Tout est exécuté à 100% dans votre navigateur via HTML5 Canvas.',
        },
        {
          q: 'La conversion modifie-t-elle les dimensions de la photo ?',
          a: 'Non, les dimensions en pixels (largeur et hauteur) restent strictement identiques.',
        },
        {
          q: 'L’outil est-il gratuit et illimité ?',
          a: 'Oui, l’outil est 100% gratuit, sans inscription, sans filigrane et sans limite de conversion.',
        },
      ],
      relatedToolsTitle: 'Autres Outils Disponibles',
      relatedToolsSubtitle: 'Explorez nos utilitaires complémentaires pour compresser, redimensionner ou recadrer.',
    },
    cropper: {
      title: 'Recadrer une Image en Ligne',
      subtitle: 'Découpez vos photos avec des ratios prédéfinis ou libres, avec une précision au pixel près, 100% dans votre navigateur.',
      badge: 'Recadrage instantané et sécurisé',
      dropzonePrompt: 'Glissez une image ici ou cliquez pour choisir un fichier à recadrer',
      privacyNotice: 'Le découpage et l’exportation s’exécutent entièrement dans la mémoire de votre navigateur sans aucun envoi sur serveur.',
      originalInfo: 'Informations de l’Image',
      originalDimensions: 'Dimensions d’Origine',
      croppedDimensions: 'Zone de Recadrage',
      cropSelection: 'Sélection du Recadrage',
      cropBoxInfo: 'Déplacez le cadre ou étirez les poignées pour ajuster la zone',
      aspectRatioTitle: 'Proportions et Ratios',
      aspectRatioSubtitle: 'Sélectionnez un ratio standard pour vos réseaux sociaux ou ajustez librement.',
      aspectRatioFree: 'Libre (Personnalisé)',
      aspectRatioSquare: '1:1 (Carré)',
      aspectRatio43: '4:3 (Standard)',
      aspectRatio169: '16:9 (Panoramique)',
      aspectRatio916: '9:16 (Vertical / Story)',
      aspectRatioFreeDesc: 'Ajustement libre sans contrainte de proportion',
      aspectRatioSquareDesc: 'Idéal pour avatars, profils et Instagram',
      aspectRatio43Desc: 'Ratio photo classique pour affichage standard',
      aspectRatio169Desc: 'Parfait pour bannières, YouTube et écrans larges',
      aspectRatio916Desc: 'Optimisé pour Stories, Reels et TikTok',
      rotateLabel: 'Pivoter l’image',
      rotate90: 'Pivoter 90°',
      rotateReset: 'Réinitialiser la rotation',
      centerCropBtn: 'Centrer le cadre',
      fitImageBtn: 'Sélectionner toute l’image',
      outputSettingsTitle: 'Options d’Exportation',
      outputSettingsSubtitle: 'Définissez le format et la qualité du fichier généré.',
      outputFormat: 'Format de Sortie',
      formatOriginal: 'Format d’origine',
      formatJpeg: 'Format JPG',
      formatPng: 'Format PNG (Haute fidélité)',
      formatWebp: 'Format WebP (Léger & Moderne)',
      qualityLabel: 'Qualité d’exportation',
      qualityHelper: 'La valeur 90% garantit une excellente fidélité des détails.',
      pngLosslessNote: 'Le format PNG est sans perte (lossless) et préserve l’intégrité totale des pixels et la transparence.',
      cropBtn: 'Recadrer et Exporter l’Image',
      croppingBtn: 'Découpage local en cours...',
      stagePreparing: 'Chargement et décodage...',
      stageCropping: 'Extraction de la zone sélectionnée...',
      stageEncoding: 'Génération du nouveau fichier...',
      stageComplete: 'Recadrage terminé avec succès !',
      resultTitle: 'Image Recadrée avec Succès',
      croppedLabel: 'Image Recadrée',
      downloadBtn: 'Télécharger l’Image Recadrée',
      cropAnother: 'Recadrer une autre image',
      howItWorksTitle: 'Comment fonctionne le recadrage en ligne ?',
      howItWorksSubtitle: '3 étapes simples pour isoler la zone idéale de vos photos sans installer de logiciel.',
      step1Title: '1. Importez votre image',
      step1Desc: 'Sélectionnez un fichier JPG, PNG ou WebP. Il est immédiatement ouvert dans la mémoire de votre navigateur.',
      step2Title: '2. Ajustez le cadre de coupe',
      step2Desc: 'Choisissez un ratio prédéfini (1:1, 16:9, etc.) ou déplacez librement les poignées du rectangle de sélection.',
      step3Title: '3. Téléchargez votre résultat',
      step3Desc: 'Cliquez sur "Recadrer l’Image" et récupérez instantanément votre visuel aux dimensions exactes.',
      whyChooseTitle: 'Pourquoi choisir notre outil de recadrage ?',
      whyChooseSubtitle: 'L’outil le plus rapide, fiable et respectueux de votre vie privée pour recadrer vos visuels.',
      benefit1Title: '100% Confidentiel & Local',
      benefit1Desc: 'Aucune image n’est transmise à un serveur distant. Tout reste sur votre appareil.',
      benefit2Title: 'Précision au Pixel Près',
      benefit2Desc: 'L’extraction est nette, sans artefact ni perte involontaire de résolution.',
      benefit3Title: 'Tactile & Mobile Friendly',
      benefit3Desc: 'L’interface interactive s’adapte parfaitement aux écrans tactiles mobiles et tablettes.',
      faqTitle: 'Questions Fréquentes sur le Recadrage',
      faqSubtitle: 'Toutes les réponses pour réussir vos découpages d’images en toute simplicité.',
      faqItems: [
        {
          q: 'Comment recadrer une image gratuitement ?',
          a: 'Importez votre photo, ajustez le rectangle de sélection ou choisissez un ratio (comme 1:1 ou 16:9), puis cliquez sur "Recadrer et Exporter l’Image" pour la télécharger.',
        },
        {
          q: 'Puis-je recadrer une image en 1:1 pour Instagram ?',
          a: 'Absolument. Sélectionnez le ratio 1:1 et le cadre gardera automatiquement une proportion carrée parfaite.',
        },
        {
          q: 'Le recadrage détériore-t-il la qualité de la photo ?',
          a: 'Non, les pixels de la zone sélectionnée conservent leur netteté et leur qualité d’origine.',
        },
        {
          q: 'Quels formats d’image sont pris en charge ?',
          a: 'Notre outil prend en charge les formats JPG, PNG et WebP en entrée comme en sortie.',
        },
        {
          q: 'Puis-je recadrer une image depuis mon smartphone ?',
          a: 'Oui, l’éditeur tactile a été spécialement conçu pour fonctionner de manière fluide sur iOS et Android.',
        },
        {
          q: 'Mes photos sont-elles téléchargées sur un serveur ?',
          a: 'Non, le traitement se fait intégralement en local dans votre navigateur via HTML5 Canvas.',
        },
        {
          q: 'L’outil est-il payant ou avec filigrane ?',
          a: 'L’outil est 100% gratuit, sans filigrane, sans publicité intrusive et sans inscription.',
        },
      ],
      relatedToolsTitle: 'Autres Outils Disponibles',
      relatedToolsSubtitle: 'Explorez nos utilitaires pour compresser, redimensionner et convertir vos photos.',
    },
  },
  en: {
    brand: {
      name: 'Image Tools',
      tagline: '100% In-Browser',
      zeroUploads: 'Zero Server Uploads',
      processingNote: 'All processing happens locally on your device.',
    },
    nav: {
      compress: 'Compress',
      resize: 'Resize',
      convert: 'Convert',
      crop: 'Crop',
      compressDesc: 'Reduce JPG, PNG, and WebP file size',
      resizeDesc: 'Scale pixel dimensions & aspect ratios',
      convertDesc: 'Switch between JPG, PNG, and WebP',
      cropDesc: 'Trim images with preset aspect ratios',
    },
    theme: {
      toggle: 'Toggle theme',
      light: 'Light Mode',
      dark: 'Dark Mode',
      switchToDark: 'Switch to dark mode',
      switchToLight: 'Switch to light mode',
    },
    lang: {
      select: 'Change language',
      arabic: 'العربية',
      french: 'Français',
      english: 'English',
    },
    hero: {
      badge: 'Instant In-Browser Processing',
      titleStart: 'Fix Your Images ',
      titleHighlight: 'in Seconds',
      subtitle:
        'Free, fast, and private online tools to compress, resize, convert, and crop your photos.',
      features: 'No registration • Zero server uploads • Unlimited usage',
    },
    dropzone: {
      title: 'Choose an image or drop it here',
      subtitle: 'Supports JPG, PNG, and WebP up to 50MB. Processed entirely in your browser.',
      pill1: '100% In-Browser',
      pill2: 'Zero Server Uploads',
      pill3: 'No Sign Up',
      changeFile: 'Change file',
      selectToolPrompt: 'Select tool to apply:',
      tools: {
        compress: 'Compress',
        compressDesc: 'Reduce size',
        resize: 'Resize',
        resizeDesc: 'Dimensions',
        convert: 'Convert',
        convertDesc: 'Format change',
        crop: 'Crop',
        cropDesc: 'Trim & aspect',
      },
      alertImageOnly: 'Please select an image file (JPG, PNG, or WebP).',
    },
    popularTools: {
      title: 'Popular Image Tools',
      subtitle: 'Select a specialized tool designed specifically for your image editing task.',
      openTool: 'Open Tool',
    },
    trust: {
      title: 'Why Use Image Tools?',
      subtitle: 'Engineered from the ground up for privacy, performance, and simplicity.',
      p1Title: '100% Client-Side Privacy',
      p1Desc:
        'Your images never leave your computer or phone. Processing occurs entirely in browser RAM using HTML5 Canvas, ensuring complete confidentiality.',
      p2Title: 'Instant Execution',
      p2Desc:
        'Skip slow internet uploads and remote server rendering queues. Experience immediate adjustments and instant file downloads.',
      p3Title: 'No Accounts, No Ads Clutter',
      p3Desc:
        'No email required, no passwords to remember, and no predatory paywalls. Simple, honest utility when you need it.',
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Three straightforward steps with zero complicated steps or software installation.',
      step1Title: '1. Select Your Image',
      step1Desc: 'Drag and drop your file into the dropzone or pick it from your phone or computer.',
      step2Title: '2. Adjust Settings',
      step2Desc: 'Tune compression quality, scale pixel dimensions, choose target formats, or crop boundaries.',
      step3Title: '3. Download Instantly',
      step3Desc: 'Hit download to save the transformed file immediately to your device storage.',
    },
    popularTasks: {
      title: 'Popular Image Tasks',
      subtitle: 'Quick shortcuts for common everyday photo workflows.',
      startTask: 'Start task',
      tasks: [
        {
          tag: 'Reduce Size',
          title: 'Compress JPG for Web',
          desc: 'Shrink file size up to 80% to accelerate website page loading times.',
        },
        {
          tag: 'Modern Formats',
          title: 'Convert to WebP',
          desc: 'Turn PNGs and JPGs into lightweight, highly efficient WebP files.',
        },
        {
          tag: 'Social Media',
          title: 'Resize for Instagram',
          desc: 'Fit exact platform guidelines for posts, stories, and feed images.',
        },
        {
          tag: 'Aspect Ratio',
          title: 'Square 1:1 Crop',
          desc: 'Perfect circular or square cuts for avatars, headshots, and thumbnails.',
        },
      ],
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our browser-based image utilities.',
      items: [
        {
          q: 'Are my images uploaded to your server?',
          a: 'Never. Image Tools uses modern in-browser HTML5 Canvas and Web APIs. Every compression, resize, conversion, or crop happens locally in your device memory. Your photos never touch a remote server.',
        },
        {
          q: 'Is Image Tools really free?',
          a: 'Yes, 100% free with no hidden paywalls, no trial periods, and no watermarks on your exported images.',
        },
        {
          q: 'Do I need to register or create an account?',
          a: 'No registration or login is required. Simply visit the site, select your image, customize settings, and download your processed file immediately.',
        },
        {
          q: 'What image formats are supported?',
          a: 'We currently support JPG/JPEG, PNG, and WebP. These formats cover over 98% of all standard web and personal photography workflows.',
        },
        {
          q: 'Is there a file size limit?',
          a: 'Because all processing happens on your device, there is no artificial cloud upload limit. For smooth browser performance and stability, we recommend files up to 50MB.',
        },
      ],
    },
    footer: {
      desc: 'Fast, free, and private online image manipulation utilities. Compress, resize, convert, and crop images with zero server uploads and zero data collection.',
      privacyBadge: 'Files never leave your device. 100% client-side.',
      toolsTitle: 'Image Tools',
      whyTitle: 'Why Image Tools',
      noReg: 'No registration required',
      speed: 'Sub-second local speeds',
      zeroLogs: 'Zero server logs or storage',
      copyright: 'Free online client-side image utilities.',
      privacyFirst: 'Privacy First Architecture',
      cloudflare: 'Cloudflare Pages Compatible',
    },
    common: {
      comingSoon: 'Coming soon',
      phase: 'Phase',
      phase2Note: 'This tool is currently in development and will be available in the next phase.',
      browse: 'Browse files',
      dragAndDrop: 'or drag and drop file here',
      dropHere: 'Drop file to upload',
      fileSelected: 'File selected successfully',
      remove: 'Remove',
      maxSize: 'Maximum size',
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      reset: 'Reset',
      download: 'Download',
      apply: 'Apply',
      cancel: 'Cancel',
      close: 'Close',
      home: 'Home',
      allTools: 'All Tools',
      ready: 'Ready',
      inProgress: 'In Progress',
      invalidMime: 'Unsupported file format. Please choose a JPG, PNG, or WebP image.',
      fileTooLarge: 'File is too large. Recommended maximum file size is 50MB.',
    },
    compressor: {
      title: 'Compress Image Online',
      subtitle: 'Drastically reduce JPG, PNG, and WebP image file sizes without sacrificing visible quality. 100% private in-browser processing.',
      badge: 'Active Tool — Phase 2',
      dropzonePrompt: 'Drag and drop or browse to select an image',
      originalLabel: 'Original Image',
      compressedLabel: 'Compressed Image',
      settingsTitle: 'Compression Settings',
      modeQuality: 'Quality Mode',
      modeTarget: 'Target File Size',
      qualityLabel: 'Compression Quality',
      qualityHelper: 'Recommended 80% offers optimal file size savings while preserving crisp visual detail.',
      targetSizeLabel: 'Target File Size (Approximate)',
      targetSizeDisclaimer: 'Note: Target size is approximate because browser encoding varies by image content and structure.',
      preset100kb: '100 KB',
      preset200kb: '200 KB',
      preset500kb: '500 KB',
      customTarget: 'Custom',
      customKbPlaceholder: 'e.g. 150',
      compressBtn: 'Compress Image',
      compressingBtn: 'Compressing...',
      stageDecoding: 'Decoding image in browser memory...',
      stageCompressing: 'Applying in-memory compression...',
      stageEvaluating: 'Calibrating optimal target size ratio...',
      stageFinalizing: 'Finalizing compressed image and report...',
      stageComplete: 'Image compressed successfully!',
      resultTitle: 'Compression Result',
      originalSize: 'Original Size',
      compressedSize: 'Compressed Size',
      saved: 'Saved',
      dimensions: 'Dimensions',
      format: 'Format',
      qualityUsed: 'Quality Applied',
      downloadBtn: 'Download Compressed Image',
      compressAnother: 'Compress Another Image',
      targetAchievedNote: 'Target file size achieved successfully.',
      targetNotAchievedNote: 'Target size is approximate. Best achievable size without reducing image dimensions is displayed.',
      pngLosslessNote: 'PNG note: Browser PNG encoding uses lossless compression. To achieve substantial file size reductions, consider converting to WebP or JPG.',
      privacyNotice: '100% processed locally on your device with HTML5 Canvas. Your images are never uploaded, transferred, or stored on any server.',
      howItWorksTitle: 'How Does Image Compression Work?',
      howItWorksSubtitle: 'Three effortless steps with zero software downloads and zero account creation.',
      step1Title: '1. Select Your Image',
      step1Desc: 'Drag and drop your JPG, PNG, or WebP photo or tap to browse your local device files.',
      step2Title: '2. Choose Compression Mode',
      step2Desc: 'Fine-tune quality with the intuitive slider, or choose a target size like 100KB, 200KB, or 500KB.',
      step3Title: '3. Download Instantly',
      step3Desc: 'Hit Compress and download your lightweight image file immediately with zero server latency.',
      whyChooseTitle: 'Why Use Our Image Compressor?',
      whyChooseSubtitle: 'Engineered for privacy, speed, and real-world utility.',
      benefit1Title: '100% Client-Side Privacy',
      benefit1Desc: 'Images never leave your computer or phone. Processing runs strictly in browser memory using HTML5 Canvas.',
      benefit2Title: 'Sub-Second Local Speeds',
      benefit2Desc: 'No upload waits or remote rendering queues. Enjoy instant compression and direct file downloads.',
      benefit3Title: 'Up to 85% Size Savings',
      benefit3Desc: 'Accelerate web page load speeds, comply with strict email limits, and save device storage.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Clear answers on browser-based image compression and privacy.',
      faqItems: [
        {
          q: 'How does image compression work?',
          a: 'The compressor loads your image directly into your browser memory via HTML5 Canvas and re-encodes pixel matrices with mathematical quantization algorithms, removing redundant metadata and invisible color data while preserving high perceptual clarity.',
        },
        {
          q: 'Does the image get uploaded to a server?',
          a: 'Never. Processing is 100% client-side inside your browser. Your images never leave your computer or smartphone.',
        },
        {
          q: 'Can I compress JPEG images?',
          a: 'Yes! JPEG images compress exceptionally well, often achieving 60% to 85% reductions in file size while retaining excellent visual sharpness.',
        },
        {
          q: 'Can I compress PNG images?',
          a: 'Yes, PNG files are fully supported. Note that standard browser Canvas PNG export is lossless. For dramatic reductions in PNG file size, consider converting to WebP or JPEG.',
        },
        {
          q: 'Can I compress an image to 100KB, 200KB, or 500KB?',
          a: 'Yes. Switch to Target File Size mode and select a preset (100KB, 200KB, 500KB) or type a custom number. The engine performs iterative binary search approximations to match your requested size.',
        },
        {
          q: 'Will image quality decrease?',
          a: 'At our recommended 80% default setting, quality loss is virtually invisible to the human eye, while delivering massive file size savings.',
        },
        {
          q: 'What happens to my original image?',
          a: 'Your original file on your computer or phone remains completely untouched. The compressed image is saved as a new file with the "-compressed" suffix.',
        },
        {
          q: 'Is Image Tools free to use?',
          a: 'Yes, 100% free with no account registration, no subscriptions, and no watermarks.',
        },
        {
          q: 'What are the supported image formats?',
          a: 'We support JPG/JPEG, PNG, and modern WebP formats.',
        },
      ],
      relatedToolsTitle: 'Related Tools Coming Soon',
      relatedToolsSubtitle: 'Discover additional photo editing utilities in the upcoming roadmap.',
    },
    resizer: {
      title: 'Free Image Resizer — Change Image Dimensions Online',
      subtitle: 'Resize JPG, PNG, and WebP photos by exact pixel width and height with aspect ratio lock. 100% private in-browser processing with zero server uploads.',
      badge: '100% Client-Side In-Browser',
      dropzonePrompt: 'Select an image to resize',
      originalInfo: 'Original Image Details',
      originalDimensions: 'Original Dimensions',
      resizedDimensions: 'New Dimensions',
      originalSize: 'Original File Size',
      resizedSize: 'Output File Size',
      fileType: 'File Format',
      dimensionsSettings: 'Dimension Settings',
      widthLabel: 'Width',
      heightLabel: 'Height',
      aspectRatioLock: 'Lock Aspect Ratio',
      aspectRatioUnlock: 'Unlock Aspect Ratio',
      aspectRatioLockedHint: 'Aspect ratio locked: modifying one dimension automatically scales the other',
      aspectRatioUnlockedHint: 'Aspect ratio unlocked: width and height can be changed independently',
      popularDimensionsTitle: 'Popular Dimensions',
      popularDimensionsSubtitle: 'Quick presets for widely used screen & social dimensions',
      presetSquare: '1080 × 1080 (Square)',
      presetLandscapeFHD: '1920 × 1080 (Full HD)',
      presetLandscapeHD: '1280 × 720 (HD Landscape)',
      presetPortrait: '1080 × 1350 (Portrait 4:5)',
      presetStory: '1080 × 1920 (Story / Reel 9:16)',
      presetCustom: 'Custom',
      presetRatioMismatchNote: 'Dimensions applied directly to preset resolution without cropping your photo.',
      outputSettings: 'Output & Quality Settings',
      outputFormat: 'Output Format',
      formatOriginal: 'Keep Original Format',
      formatJpeg: 'JPG / JPEG',
      formatPng: 'PNG',
      formatWebp: 'WebP',
      qualityLabel: 'Export Quality',
      qualityHelper: 'Recommended: 85% for crystal-clear visual fidelity and optimized file weight.',
      pngLosslessNote: 'PNG format uses lossless compression in the browser; the quality slider does not alter lossless PNG output.',
      resizeBtn: 'Resize Image Now',
      resizingBtn: 'Resizing Image...',
      stagePreparing: 'Preparing image in browser memory...',
      stageResizing: 'Resizing and interpolating pixel matrix...',
      stageEncoding: 'Encoding output image file...',
      stageComplete: 'Image resized successfully!',
      resultTitle: 'Image Resized Successfully',
      downloadBtn: 'Download Resized Image',
      resizeAnother: 'Resize Another Image',
      sizeDifference: 'Size difference',
      validationMinSize: 'Each dimension must be at least 1 pixel.',
      validationMaxSize: 'Dimensions exceed the safe browser canvas threshold of 16,384 px.',
      validationMaxPixels: 'Total resolution exceeds the safe 64 Megapixel memory limit.',
      howItWorksTitle: 'How Image Resizing Works',
      howItWorksSubtitle: 'Three fast and seamless steps, completely local inside your browser.',
      step1Title: '1. Select Your Photo',
      step1Desc: 'Drag and drop or browse to choose a JPG, PNG, or WebP photo from your computer or mobile device.',
      step2Title: '2. Set Target Dimensions',
      step2Desc: 'Type your exact target width and height in pixels, or click a popular preset with aspect-ratio lock.',
      step3Title: '3. Download Instantly',
      step3Desc: 'Click Resize Image and download your newly scaled photo in milliseconds with zero server delay.',
      whyChooseTitle: 'Why Choose Our Image Resizer?',
      whyChooseSubtitle: 'Engineered for speed, privacy, and pixel-perfect clarity.',
      benefit1Title: '100% Client-Side Privacy',
      benefit1Desc: 'Your images never touch any server. Everything executes within your device’s sandboxed browser memory.',
      benefit2Title: 'High-Precision Smoothing',
      benefit2Desc: 'High-quality bicubic interpolation prevents jagged edges and preserves razor-sharp details when scaling.',
      benefit3Title: 'Smart Aspect-Ratio Lock',
      benefit3Desc: 'Maintains true proportional balance to avoid unnatural squishing, stretching, or image distortion.',
      faqTitle: 'Frequently Asked Questions About Resizing',
      faqSubtitle: 'Everything you need to know about resizing images in Image Tools.',
      faqItems: [
        {
          q: 'How do I resize an image?',
          a: 'Select your photo, type your desired pixel width or height (or click a preset), and press "Resize Image Now". Your resized photo is generated instantly.',
        },
        {
          q: 'Does resizing crop my image?',
          a: 'No. Resizing recalculates the overall pixel dimensions of the full image without clipping or cropping any content. Cropping is handled by the dedicated Cropper tool.',
        },
        {
          q: 'Does resizing reduce image quality?',
          a: 'Our engine applies high-quality browser smoothing algorithms (imageSmoothingQuality="high"). Downscaling keeps images crisp and sharp, while significant upscaling will enlarge existing pixels.',
        },
        {
          q: 'Can I maintain the original aspect ratio?',
          a: 'Yes, the aspect ratio lock (🔒) is enabled by default. Typing a new width automatically computes the matching height proportionally.',
        },
        {
          q: 'Can I resize an image to 1080 × 1080?',
          a: 'Yes! Simply click the "1080 × 1080 (Square)" button in the popular presets to set both dimensions with one click.',
        },
        {
          q: 'Can I enter custom dimensions?',
          a: 'Yes, you can manually type any pixel values into the Width and Height input boxes to fit your exact specifications.',
        },
        {
          q: 'Are my images uploaded to any server?',
          a: 'Never. Processing is 100% client-side inside your browser via Canvas and Web APIs. No server receives your images.',
        },
        {
          q: 'What image formats are supported?',
          a: 'JPG, PNG, and WebP formats are fully supported for both input and output.',
        },
        {
          q: 'Can I resize very large photos?',
          a: 'Yes. Files up to 50MB and resolutions up to 16,384 pixels are safely handled within browser memory boundaries.',
        },
      ],
      relatedToolsTitle: 'More Useful Image Tools',
      relatedToolsSubtitle: 'Explore our companion utilities to compress, convert, or crop your visuals.',
    },
    converter: {
      title: 'Free Online Image Converter',
      subtitle: 'Convert images between JPG, PNG, and WebP instantly with pristine quality and 100% in-browser privacy.',
      badge: '100% In-Browser',
      dropzonePrompt: 'Select or drop an image here to convert its format',
      privacyNotice: '100% Client-Side • Your files never leave your device',
      originalInfo: 'Source File Info',
      originalFormat: 'Original Format',
      targetFormat: 'Target Format',
      originalDimensions: 'Original Dimensions',
      originalSize: 'Original Size',
      convertedSize: 'Converted Size',
      dimensionsPreserved: '100% Dimensions Preserved',
      formatSettingsTitle: 'Format Settings',
      formatSettingsSubtitle: 'Choose your desired output format and configure quality or background settings',
      selectTargetFormat: 'Select Output Format',
      formatJpeg: 'JPG / JPEG Image',
      formatPng: 'PNG Image (High Fidelity & Alpha)',
      formatWebp: 'WebP Image (Modern & Web-Optimized)',
      formatJpegDesc: 'Ideal for photos and universal compatibility across all devices (no alpha transparency).',
      formatPngDesc: 'Preserves 100% pixel fidelity and transparent backgrounds using lossless compression.',
      formatWebpDesc: 'Next-gen web format providing significantly smaller file sizes with transparency support.',
      qualityLabel: 'Export Quality',
      qualityHelper: 'Recommended 85% provides the optimal balance of visual crispness and compact file size.',
      qualityWebpHelper: 'WebP offers noticeably smaller file sizes compared to JPEG at identical visual quality.',
      pngLosslessNote: 'PNG format uses lossless compression. Every pixel is preserved without lossy artifacts.',
      transparencyWarningTitle: 'Transparency in JPEG format',
      transparencyWarningDesc: 'JPEG does not support transparency. Transparent areas will be filled with the selected background color.',
      bgColorLabel: 'Background color for transparent areas',
      bgColorWhite: 'White (Default)',
      bgColorBlack: 'Black',
      bgColorCustom: 'Custom Color',
      sameFormatNotice: 'Selected format is identical to original source format.',
      convertBtn: 'Convert Image Now',
      convertingBtn: 'Converting locally in browser...',
      stagePreparing: 'Reading and decoding image...',
      stageConverting: 'Rendering onto canvas...',
      stageEncoding: 'Encoding into new format...',
      stageComplete: 'Image converted successfully!',
      resultTitle: 'Image Converted Successfully',
      convertedLabel: 'Converted Image',
      downloadBtn: 'Download Converted Image',
      convertAnother: 'Convert Another Image',
      sizeReduced: 'File size reduced by',
      sizeIncreased: 'File size increased by',
      sizeUnchanged: 'File size virtually unchanged',
      formatChange: 'Format change',
      howItWorksTitle: 'How does client-side conversion work?',
      howItWorksSubtitle: 'Fast, secure 3-step pipeline running entirely inside your browser.',
      step1Title: '1. Select Your Image',
      step1Desc: 'Upload any JPG, PNG, or WebP file. It is decoded directly in your browser memory.',
      step2Title: '2. Pick Target Format',
      step2Desc: 'Choose JPG, PNG, or WebP and adjust quality or background colors as desired.',
      step3Title: '3. Download Converted File',
      step3Desc: 'Hit Convert, inspect the size savings and visual preview, and save your new file.',
      whyChooseTitle: 'Why Choose Our Image Converter?',
      whyChooseSubtitle: 'The fastest, safest way to switch image formats without compromising privacy.',
      benefit1Title: '100% Private & Local',
      benefit1Desc: 'Zero server uploads. Your personal and work photos never touch an external server.',
      benefit2Title: 'Blazing Fast Speed',
      benefit2Desc: 'No upload or download network lag. Conversions happen instantly at hardware speeds.',
      benefit3Title: 'Exact Pixel Dimensions',
      benefit3Desc: 'Your original width and height are preserved with zero distortion or accidental resizing.',
      matrixTitle: 'Image Format Comparison Matrix',
      matrixSubtitle: 'A handy overview to help you choose the right format for any project.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Clear answers to common questions about converting and exporting image files.',
      faqItems: [
        {
          q: 'How do I convert an image for free?',
          a: 'Drop your image into the upload box, select your target format (JPG, PNG, or WebP), click "Convert Image Now", and download your converted file instantly.',
        },
        {
          q: 'Can I convert transparent PNG to JPG?',
          a: 'Yes! Since JPEG does not support transparency, our converter lets you choose a background fill color (white by default) to render transparent areas cleanly without black artifacts.',
        },
        {
          q: 'Why should I convert JPG to WebP?',
          a: 'WebP provides 25% to 35% smaller file sizes than standard JPEG at equivalent visual quality, making your websites load substantially faster.',
        },
        {
          q: 'Can I convert WebP back to JPG or PNG?',
          a: 'Yes, our converter effortlessly turns WebP images into universal JPGs for older software or into PNGs for graphic design workflows.',
        },
        {
          q: 'Are my images uploaded to any server or cloud?',
          a: 'Never. All conversions happen entirely on your device using native HTML5 Canvas APIs. No data is stored or transmitted.',
        },
        {
          q: 'Does converting change the image dimensions?',
          a: 'No, the converter strictly maintains the exact original width and height in pixels.',
        },
        {
          q: 'Is this converter completely free to use?',
          a: 'Yes, 100% free with no account creation, no subscriptions, no watermarks, and no usage limits.',
        },
      ],
      relatedToolsTitle: 'More Useful Image Tools',
      relatedToolsSubtitle: 'Explore our companion utilities to compress, resize, or crop your visuals.',
    },
    cropper: {
      title: 'Crop Image Online',
      subtitle: 'Fast, precise, 100% private image cropping with customizable and preset aspect ratios directly in your browser.',
      badge: 'Instant & Private In-Browser Cropper',
      dropzonePrompt: 'Drag & drop an image here, or browse your files to crop',
      privacyNotice: 'Cropping and exporting run entirely in your local browser memory. No photos are uploaded to any server.',
      originalInfo: 'Original Image Details',
      originalDimensions: 'Original Dimensions',
      croppedDimensions: 'Cropped Dimensions',
      cropSelection: 'Crop Area Selection',
      cropBoxInfo: 'Drag the box to move, or drag handles to resize the crop area',
      aspectRatioTitle: 'Aspect Ratio Preset',
      aspectRatioSubtitle: 'Choose a fixed proportion for social media and web layouts, or use free crop.',
      aspectRatioFree: 'Free (Custom)',
      aspectRatioSquare: '1:1 (Square)',
      aspectRatio43: '4:3 (Standard)',
      aspectRatio169: '16:9 (Widescreen)',
      aspectRatio916: '9:16 (Vertical / Story)',
      aspectRatioFreeDesc: 'Unconstrained freeform cropping to any dimensions',
      aspectRatioSquareDesc: 'Ideal for profile pictures, avatars, and Instagram feeds',
      aspectRatio43Desc: 'Standard photo format for monitors and displays',
      aspectRatio169Desc: 'Best for YouTube thumbnails, banners, and desktop displays',
      aspectRatio916Desc: 'Optimized for Instagram Stories, TikTok, and Reels',
      rotateLabel: 'Rotate image',
      rotate90: 'Rotate 90°',
      rotateReset: 'Reset rotation',
      centerCropBtn: 'Center Crop Box',
      fitImageBtn: 'Select Whole Image',
      outputSettingsTitle: 'Export & Format Settings',
      outputSettingsSubtitle: 'Configure output format and compression quality.',
      outputFormat: 'Output Format',
      formatOriginal: 'Original Format',
      formatJpeg: 'JPG / JPEG',
      formatPng: 'PNG (Lossless & Alpha)',
      formatWebp: 'WebP (Modern & Compact)',
      qualityLabel: 'Compression Quality',
      qualityHelper: 'Recommended 90% preserves pin-sharp detail while ensuring optimal file size.',
      pngLosslessNote: 'PNG format uses lossless compression preserving full pixel clarity and transparency.',
      cropBtn: 'Crop & Export Image',
      croppingBtn: 'Cropping in browser memory...',
      stagePreparing: 'Reading and decoding image...',
      stageCropping: 'Extracting selected pixel bounds...',
      stageEncoding: 'Encoding and saving new image...',
      stageComplete: 'Image cropped successfully!',
      resultTitle: 'Image Cropped Successfully',
      croppedLabel: 'Cropped Image',
      downloadBtn: 'Download Cropped Image',
      cropAnother: 'Crop Another Image',
      howItWorksTitle: 'How does client-side cropping work?',
      howItWorksSubtitle: 'A fast, reliable 3-step pipeline running entirely inside your browser.',
      step1Title: '1. Select or Drop Your Image',
      step1Desc: 'Upload any JPG, PNG, or WebP file. It opens directly in browser memory without uploading.',
      step2Title: '2. Adjust Crop Box & Ratio',
      step2Desc: 'Pick a ratio (1:1, 16:9, etc.) or drag the box and corner handles to frame your visual perfectly.',
      step3Title: '3. Download Your Cropped Image',
      step3Desc: 'Click Crop & Export, preview the high-res result, and save your new file instantly.',
      whyChooseTitle: 'Why Choose Our Online Cropper?',
      whyChooseSubtitle: 'The fastest, safest, and most precise way to frame your photos without compromising privacy.',
      benefit1Title: '100% Private & Local',
      benefit1Desc: 'Zero server uploads. Your personal and client images never leave your computer or phone.',
      benefit2Title: 'Pixel-Perfect Precision',
      benefit2Desc: 'Crops exactly along pixel boundaries without distortion, blurring, or accidental stretching.',
      benefit3Title: 'Touch & Mobile Friendly',
      benefit3Desc: 'Responsive touch-enabled overlay with large drag handles designed for phones and tablets.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Clear answers to common questions about cropping and exporting images.',
      faqItems: [
        {
          q: 'How do I crop an image for free online?',
          a: 'Drop your image into the workspace, adjust the crop box or select an aspect ratio preset (such as 1:1 or 16:9), and click "Crop & Export Image" to download your result immediately.',
        },
        {
          q: 'Can I crop an image into a perfect 1:1 square for Instagram or avatars?',
          a: 'Yes! Simply select the 1:1 preset and the crop selector will automatically lock to a square aspect ratio, letting you position and frame your subject effortlessly.',
        },
        {
          q: 'Does cropping reduce image quality?',
          a: 'No. The pixels within your selected crop area maintain 100% of their original visual sharpness and fidelity.',
        },
        {
          q: 'What image formats can I crop?',
          a: 'You can crop JPG, PNG, and WebP images, and choose whether to export in the original format or convert to a new format simultaneously.',
        },
        {
          q: 'Does the cropper work on iPhone, iPad, and Android?',
          a: 'Yes, the crop interface is fully touch-optimized with smooth gesture handling and responsive handles for mobile devices.',
        },
        {
          q: 'Are my images uploaded to a cloud server?',
          a: 'Never. All decoding, coordinate calculation, and canvas rendering happen locally in your web browser.',
        },
        {
          q: 'Is this cropping tool free to use?',
          a: 'Yes, 100% free with no account required, no watermark added, and no daily limits.',
        },
      ],
      relatedToolsTitle: 'More Useful Image Tools',
      relatedToolsSubtitle: 'Explore our companion utilities to compress, resize, or convert your visuals.',
    },
  },
};
