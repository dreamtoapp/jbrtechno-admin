import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, TrendingUp, UserPlus, CreditCard, MessageSquare, Lightbulb } from 'lucide-react';

export default async function CustomersPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const features = [
    {
      icon: UserPlus,
      title: 'معلومات العملاء',
      description: 'حفظ البيانات الأساسية ومعلومات التواصل'
    },
    {
      icon: CreditCard,
      title: 'الاشتراكات',
      description: 'تتبع اشتراكات العملاء وحالتها'
    },
    {
      icon: MessageSquare,
      title: 'الملاحظات والشكاوي',
      description: 'تسجيل ملاحظات وشكاوي العملاء'
    },
    {
      icon: Lightbulb,
      title: 'الاقتراحات والطلبات',
      description: 'متابعة اقتراحات وطلبات العملاء'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/20 to-green-500/5">
            <Users className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-2">
              العملاء
            </h1>
            <p className="text-muted-foreground text-lg">
              نظام بسيط لإدارة العملاء واشتراكاتهم وملاحظاتهم - ينمو مع احتياجات جبرسيو
            </p>
          </div>
        </div>
      </div>

      {/* Coming Soon Hero Section */}
      <div className="mb-8 relative overflow-hidden">
        <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-green-950/50 dark:via-emerald-950/30 dark:to-teal-950/20 shadow-lg">
          <CardContent className="py-12 px-6 text-center relative">
            {/* Animated background circles */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-300/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 flex flex-col items-center gap-6">
              {/* Large animated icon */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                <div className="relative p-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                  <Users className="h-16 w-16 text-white" />
                </div>
              </div>

              {/* Large Coming Soon Badge */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative inline-flex">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-full blur-md opacity-75 animate-pulse"></div>
                  <Badge className="relative text-2xl md:text-3xl px-8 py-3 font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <span className="flex items-center gap-3">
                      <span className="animate-bounce">✨</span>
                      قريباً
                      <span className="animate-bounce-delay-100">✨</span>
                    </span>
                  </Badge>
                </div>

                {/* Subtitle */}
                <p className="text-lg md:text-xl font-semibold text-green-900 dark:text-green-100 max-w-2xl">
                  🚀 نبني هذا النظام داخلياً لدعم جبرسيو في المرحلة الأولى
                </p>

                {/* Progress indicator */}
                <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-delay-100"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce-delay-200"></div>
                  </div>
                  <span className="font-medium">
                    جاري التطوير
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Description Card */}
      <Card className="mb-8 border-green-200 dark:border-green-900/30 bg-gradient-to-br from-green-50/50 to-transparent dark:from-green-950/20">
        <CardHeader>
          <CardTitle className="text-2xl">
            نظرة عامة
          </CardTitle>
          <CardDescription className="text-base">
            نبدأ بنظام بسيط لإدارة معلومات العملاء، اشتراكاتهم، ملاحظاتهم، شكاويهم، واقتراحاتهم. مع نمو نظام جبرسيو، سنضيف ميزات متقدمة مثل CRM كامل وتحليل رضا العملاء.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-green-200 dark:border-green-900/30">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1">
                البداية البسيطة
              </h4>
              <p className="text-sm text-muted-foreground">
                نبدأ بتسجيل معلومات العملاء الأساسية، اشتراكاتهم، وتتبع ملاحظاتهم وشكاويهم واقتراحاتهم. مع الوقت، سنضيف ميزات مثل التحليلات، تقييم الرضا، والرد التلقائي. النظام ينمو مع احتياجات نظام جبرسيو.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Features Grid */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          نبدأ بالأساسيات
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card key={index} className="hover:shadow-md transition-all duration-200 hover:border-green-200 dark:hover:border-green-900/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
                      <Icon className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1 text-sm">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Future Growth */}
      <Card className="border-dashed">
        <CardHeader>
          <CardTitle className="text-lg">
            مع نمو نظام جبرسيو سنضيف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              تقييم رضا العملاء
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              تحليل الشكاوي والاقتراحات
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              الرد التلقائي على الطلبات
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              تتبع حالة الطلبات
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              تقارير تحليلية للاشتراكات
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              إشعارات تلقائية للعملاء
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

