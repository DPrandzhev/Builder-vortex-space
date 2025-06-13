import { useState } from "react";
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
  Users,
  Clock,
  Target,
  Star,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartSurvey = async () => {
    setIsLoading(true);
    // Small delay for better UX
    setTimeout(() => {
      navigate("/survey");
    }, 500);
  };

  const features = [
    {
      icon: <Target className="h-8 w-8 text-fitness-primary" />,
      title: "Персонализирани програми",
      description:
        "AI генерирани фитнес планове, адаптирани специално за вашите цели и възможности",
    },
    {
      icon: <Clock className="h-8 w-8 text-fitness-primary" />,
      title: "Бърза доставка",
      description:
        "Получете вашата програма по имейл в рамките на 24 часа след плащането",
    },
    {
      icon: <Users className="h-8 w-8 text-fitness-primary" />,
      title: "Професионален подход",
      description:
        "Създадено от фитнес експерти и подкрепено от най-новите AI технологии",
    },
  ];

  const steps = [
    {
      number: 1,
      title: "Попълнете въпросника",
      description: "5-10 минути за персонализация",
    },
    {
      number: 2,
      title: "Извършете плащане",
      description: "Сигурно плащане с Борика - 20 лв",
    },
    {
      number: 3,
      title: "Получете програмата",
      description: "По имейл в рамките на 24 часа",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Target className="h-8 w-8 text-fitness-primary" />
              <span className="text-2xl font-bold text-fitness-dark">
                FitnessPlan AI
              </span>
            </div>
            <Button variant="outline" onClick={handleStartSurvey}>
              Започнете сега
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-fitness-primary to-fitness-secondary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Вашата персонализирана
              <span className="block text-fitness-accent">фитнес програма</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
              Получете AI генерирана фитнес програма, създадена специално за
              вашите цели, възможности и предпочитания. Професионален подход за
              максимални резултати.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-fitness-primary hover:bg-gray-100 text-lg px-8 py-4 h-auto"
                onClick={handleStartSurvey}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-fitness-primary"></div>
                    <span>Зареждане...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <span>Започнете сега</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                )}
              </Button>
              <div className="flex items-center space-x-2 text-blue-100">
                <CheckCircle className="h-5 w-5" />
                <span>Без абонамент • Еднократно плащане</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fitness-dark mb-4">
              Защо да изберете нашите програми?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Съчетаваме най-новите AI технологии с професионален фитнес
              експертиз
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-fitness-light rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl text-fitness-dark">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-fitness-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fitness-dark mb-4">
              Как работи?
            </h2>
            <p className="text-xl text-gray-600">
              Три лесни стъпки до вашата идеална фитнес програма
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-fitness-primary text-white text-2xl font-bold rounded-full mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-fitness-dark mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-fitness-dark mb-4">
              Какво казват нашите клиенти
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Мария С.",
                text: "Програмата беше точно това, от което се нуждаех! Персонализирана и лесна за следване.",
                rating: 5,
              },
              {
                name: "Георги Т.",
                text: "Впечатлен съм от детайлността на програмата. Всичко е обяснено ясно и разбираемо.",
                rating: 5,
              },
              {
                name: "Елена Д.",
                text: "Получих програмата за по-малко от ден. Професионално изпълнение!",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  <p className="font-semibold text-fitness-dark">
                    {testimonial.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-fitness-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold mb-6">
            Готови ли сте да започнете?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Отнема само няколко минути да получите вашата персонализирана фитнес
            програма
          </p>
          <Button
            size="lg"
            className="bg-white text-fitness-primary hover:bg-gray-100 text-lg px-8 py-4 h-auto"
            onClick={handleStartSurvey}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-fitness-primary"></div>
                <span>Зареждане...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>Започнете въпросника</span>
                <ArrowRight className="h-5 w-5" />
              </div>
            )}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-fitness-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Target className="h-8 w-8 text-fitness-accent" />
              <span className="text-2xl font-bold">FitnessPlan AI</span>
            </div>
            <p className="text-gray-400 mb-8">
              Персонализирани фитнес програми, създадени с AI технологии
            </p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">
                © 2024 FitnessPlan AI. Всички права запазени.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
