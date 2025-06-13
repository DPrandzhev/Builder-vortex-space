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
import {
  CheckCircle,
  Target,
  Mail,
  Clock,
  Download,
  ArrowLeft,
} from "lucide-react";

export default function Confirmation() {
  const navigate = useNavigate();
  const [customerEmail, setCustomerEmail] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  useEffect(() => {
    // Check if payment was completed
    const paymentCompleted = localStorage.getItem("paymentCompleted");
    const email = localStorage.getItem("customerEmail");
    const date = localStorage.getItem("paymentDate");

    if (!paymentCompleted || !email) {
      navigate("/");
      return;
    }

    setCustomerEmail(email);
    if (date) {
      setPaymentDate(
        new Date(date).toLocaleDateString("bg-BG", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    }
  }, [navigate]);

  const handleNewOrder = () => {
    // Clear localStorage and start over
    localStorage.removeItem("surveyData");
    localStorage.removeItem("customerEmail");
    localStorage.removeItem("paymentCompleted");
    localStorage.removeItem("paymentDate");
    navigate("/");
  };

  const nextSteps = [
    {
      icon: <Mail className="h-6 w-6 text-fitness-primary" />,
      title: "Потвърждение по имейл",
      description:
        "Ще получите потвърждение на вашата поръчка в рамките на няколко минути",
      timing: "Веднага",
    },
    {
      icon: <Target className="h-6 w-6 text-fitness-primary" />,
      title: "Генериране на програмата",
      description:
        "Нашата AI система ще създаде вашата персонализирана фитнес програма",
      timing: "В рамките на 12 часа",
    },
    {
      icon: <Download className="h-6 w-6 text-fitness-primary" />,
      title: "Доставка",
      description: "Получете вашата завършена програма като PDF файл на имейл",
      timing: "В рамките на 24 часа",
    },
  ];

  const support = [
    "Имейл: support@fitnessplan-ai.bg",
    "Телефон: +359 888 123 456",
    "Работно време: Пон-Пет 9:00-18:00",
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-fitness-dark mb-2">
            Благодарим ви за поръчката!
          </h1>
          <p className="text-xl text-gray-600">
            Вашето плащане беше успешно обработено
          </p>
        </div>

        {/* Order Details */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-fitness-primary text-white">
            <CardTitle className="text-xl">Детайли на поръчката</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-fitness-dark mb-2">
                  Имейл за доставка
                </h3>
                <p className="text-gray-700">{customerEmail}</p>
              </div>
              <div>
                <h3 className="font-semibold text-fitness-dark mb-2">
                  Дата на плащане
                </h3>
                <p className="text-gray-700">{paymentDate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-fitness-dark mb-2">
                  Продукт
                </h3>
                <p className="text-gray-700">Персонализирана фитнес програма</p>
              </div>
              <div>
                <h3 className="font-semibold text-fitness-dark mb-2">
                  Обща сума
                </h3>
                <p className="text-gray-700 font-semibold">24.00 лв</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-fitness-dark">
              Какво следва?
            </CardTitle>
            <CardDescription>
              Ето какво ще се случи в следващите 24 часа
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-fitness-light rounded-full">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-fitness-dark">
                        {step.title}
                      </h3>
                      <span className="text-sm text-fitness-primary font-medium bg-fitness-light px-2 py-1 rounded">
                        {step.timing}
                      </span>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <Card className="shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-fitness-dark">
              Нужна ви е помощ?
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-gray-600 mb-4">
              Ако имате въпроси или проблеми с вашата поръчка, не се колебайте
              да се свържете с нас:
            </p>
            <div className="space-y-2">
              {support.map((info, index) => (
                <p key={index} className="text-gray-700">
                  {info}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Card className="shadow-lg mb-8 border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <Clock className="h-6 w-6 text-orange-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-orange-900 mb-2">
                  Важна информация
                </h3>
                <ul className="text-orange-800 space-y-1 text-sm">
                  <li>
                    • Проверете вашия спам/junk фолдер, ако не получите имейл в
                    рамките на час
                  </li>
                  <li>
                    • Програмата ще бъде изпратена като PDF файл, готов за печат
                  </li>
                  <li>
                    • Запазете вашата програма на сигурно място за бъдеща
                    употреба
                  </li>
                  <li>
                    • При технически проблеми, свържете се с нашия екип веднага
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={handleNewOrder} className="btn-primary">
            Нова поръчка
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Към началото</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
