import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Target,
  CheckCircle,
  CreditCard,
  Mail,
  Clock,
  ArrowLeft,
} from "lucide-react";

export default function Payment() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [surveyData, setSurveyData] = useState(null);

  useEffect(() => {
    // Check if survey data exists
    const data = localStorage.getItem("surveyData");
    if (!data) {
      navigate("/survey");
      return;
    }
    setSurveyData(JSON.parse(data));
  }, [navigate]);

  const handlePayment = async () => {
    if (!email) {
      alert("Моля въведете валиден имейл адрес");
      return;
    }

    setIsLoading(true);

    // Store email for confirmation page
    localStorage.setItem("customerEmail", email);

    // Simulate Borica payment integration
    // In real implementation, this would redirect to Borica's payment gateway
    setTimeout(() => {
      // Simulate successful payment
      localStorage.setItem("paymentCompleted", "true");
      localStorage.setItem("paymentDate", new Date().toISOString());
      navigate("/confirmation");
    }, 3000);
  };

  const handleBack = () => {
    navigate("/survey");
  };

  const features = [
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Персонализирана AI фитнес програма",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Детайлни упражнения с обяснения",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Хранителни препоръки",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "График за прогресия",
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      text: "Доставка в рамките на 24 часа",
    },
  ];

  return (
    <div className="min-h-screen bg-fitness-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-fitness-primary" />
            <span className="text-2xl font-bold text-fitness-dark">
              FitnessPlan AI
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-fitness-dark">
                  Обобщение на поръчката
                </CardTitle>
                <CardDescription>
                  Вашата персонализирана фитнес програма
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      {feature.icon}
                      <span className="text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">
                      Персонализирана фитнес програма
                    </span>
                    <span className="text-lg font-semibold">20.00 лв</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">ДДС (20%)</span>
                    <span className="text-gray-600">4.00 лв</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-xl font-bold text-fitness-primary">
                    <span>Общо</span>
                    <span>24.00 лв</span>
                  </div>
                </div>

                <div className="bg-fitness-light p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-fitness-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-fitness-dark">
                        Бърза доставка
                      </h4>
                      <p className="text-sm text-gray-600">
                        Вашата програма ще бъде изпратена на вашия имейл в
                        рамките на 24 часа след потвърждаване на плащането.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-fitness-dark flex items-center space-x-2">
                  <CreditCard className="h-6 w-6" />
                  <span>Плащане</span>
                </CardTitle>
                <CardDescription>Сигурно плащане чрез Борика</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-base font-medium">
                    Имейл адрес *
                  </Label>
                  <div className="mt-2 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    На този адрес ще получите вашата програма
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-blue-900">
                        Плащане чрез Борика
                      </h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Ще бъдете пренасочени към сигурния портал на Борика за
                        завършване на плащането. Приемаме всички основни банкови
                        карти.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={!email || isLoading}
                  className="w-full h-12 text-lg btn-primary"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Прехвърляне към Борика...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-5 w-5" />
                      <span>Плати 24.00 лв</span>
                    </div>
                  )}
                </Button>

                <div className="text-center">
                  <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="text-fitness-primary hover:text-fitness-primary/80"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Назад към въпросника
                  </Button>
                </div>

                <div className="text-xs text-gray-500 text-center space-y-1">
                  <p>Плащането се обработва сигурно чрез Борика</p>
                  <p>Вашите данни са защитени с SSL криптиране</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
