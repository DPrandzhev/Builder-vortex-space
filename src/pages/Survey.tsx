import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Target } from "lucide-react";

interface SurveyData {
  // Основни цели и опит
  goal: string;
  timeGoal: string;
  experience: string;
  frequency: string;
  duration: string;

  // Лични данни
  age: string;
  gender: string;
  height: string;
  weight: string;

  // Оборудване и място
  equipment: string[];
  location: string;

  // Здравословни съображения
  injuries: string;
  healthConditions: string;
  medications: string;

  // Диетични предпочитания
  dietType: string;
  foodRestrictions: string;

  // Допълнителна информация
  additionalInfo: string;
}

const initialData: SurveyData = {
  goal: "",
  timeGoal: "",
  experience: "",
  frequency: "",
  duration: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  equipment: [],
  location: "",
  injuries: "",
  healthConditions: "",
  medications: "",
  dietType: "",
  foodRestrictions: "",
  additionalInfo: "",
};

export default function Survey() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 6;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateData = (field: keyof SurveyData, value: string | string[]) => {
    setSurveyData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/");
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    // Store survey data in localStorage for the payment page
    localStorage.setItem("surveyData", JSON.stringify(surveyData));
    setTimeout(() => {
      navigate("/payment");
    }, 1000);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return surveyData.goal && surveyData.timeGoal && surveyData.experience;
      case 1:
        return surveyData.frequency && surveyData.duration;
      case 2:
        return (
          surveyData.age &&
          surveyData.gender &&
          surveyData.height &&
          surveyData.weight
        );
      case 3:
        return surveyData.equipment.length > 0 && surveyData.location;
      case 4:
        return true; // Health conditions are optional
      case 5:
        return true; // Diet preferences are optional
      default:
        return false;
    }
  };

  const handleEquipmentChange = (equipment: string, checked: boolean) => {
    if (checked) {
      updateData("equipment", [...surveyData.equipment, equipment]);
    } else {
      updateData(
        "equipment",
        surveyData.equipment.filter((e) => e !== equipment),
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Каква е основната ви цел?
              </h3>
              <RadioGroup
                value={surveyData.goal}
                onValueChange={(value) => updateData("goal", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="muscle-gain" id="muscle-gain" />
                  <Label htmlFor="muscle-gain">
                    Изграждане на мускулна маса
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weight-loss" id="weight-loss" />
                  <Label htmlFor="weight-loss">
                    Отслабване/изгаряне на калории
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="endurance" id="endurance" />
                  <Label htmlFor="endurance">Подобряване на издръжливост</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tone" id="tone" />
                  <Label htmlFor="tone">Тонус и форма</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="sport" id="sport" />
                  <Label htmlFor="sport">Спорт или хоби</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Имате ли конкретна цел за период от време?
              </h3>
              <RadioGroup
                value={surveyData.timeGoal}
                onValueChange={(value) => updateData("timeGoal", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-month" id="1-month" />
                  <Label htmlFor="1-month">До 1 месец</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-months" id="3-months" />
                  <Label htmlFor="3-months">До 3 месеца</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="6-months" id="6-months" />
                  <Label htmlFor="6-months">6-12 месеца</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-year" id="1-year" />
                  <Label htmlFor="1-year">Над 1 година</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no-deadline" id="no-deadline" />
                  <Label htmlFor="no-deadline">Нямам срок</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                От колко време тренирате?
              </h3>
              <RadioGroup
                value={surveyData.experience}
                onValueChange={(value) => updateData("experience", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="beginner" id="beginner" />
                  <Label htmlFor="beginner">Начинаещ (под 6 месеца)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="intermediate" id="intermediate" />
                  <Label htmlFor="intermediate">
                    Средно ниво (6 месеца - 2 години)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="advanced" id="advanced" />
                  <Label htmlFor="advanced">Напреднал (над 2 години)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="expert" id="expert" />
                  <Label htmlFor="expert">Експерт (над 5 години)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Колко пъти седмично можете да тренирате?
              </h3>
              <RadioGroup
                value={surveyData.frequency}
                onValueChange={(value) => updateData("frequency", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1-2" id="1-2" />
                  <Label htmlFor="1-2">1-2 пъти</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3-4" id="3-4" />
                  <Label htmlFor="3-4">3-4 пъти</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5-6" id="5-6" />
                  <Label htmlFor="5-6">5-6 пъти</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily">Всеки ден</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Колко време можете да отделите за една тренировка?
              </h3>
              <RadioGroup
                value={surveyData.duration}
                onValueChange={(value) => updateData("duration", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="30min" id="30min" />
                  <Label htmlFor="30min">До 30 минути</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="45min" id="45min" />
                  <Label htmlFor="45min">30-45 минути</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60min" id="60min" />
                  <Label htmlFor="60min">45-60 минути</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="90min" id="90min" />
                  <Label htmlFor="90min">60-90 минути</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="120min" id="120min" />
                  <Label htmlFor="120min">Над 90 минути</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Възраст</h3>
              <Input
                type="number"
                placeholder="Въведете възрастта си"
                value={surveyData.age}
                onChange={(e) => updateData("age", e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Пол</h3>
              <RadioGroup
                value={surveyData.gender}
                onValueChange={(value) => updateData("gender", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male">Мъж</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female">Жена</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Височина (см)</h3>
              <Input
                type="number"
                placeholder="Въведете височината си в сантиметри"
                value={surveyData.height}
                onChange={(e) => updateData("height", e.target.value)}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Тегло (кг)</h3>
              <Input
                type="number"
                placeholder="Въведете теглото си в килограми"
                value={surveyData.weight}
                onChange={(e) => updateData("weight", e.target.value)}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                С какво оборудване разполагате?
              </h3>
              <div className="space-y-2">
                {[
                  "��ъмбели",
                  "Щанга",
                  "Лост/лостица",
                  "Кардио уред",
                  "Гири",
                  "Еластични ленти",
                  "Топки за фитнес",
                  "Никакво оборудване",
                ].map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <Checkbox
                      id={item}
                      checked={surveyData.equipment.includes(item)}
                      onCheckedChange={(checked) =>
                        handleEquipmentChange(item, !!checked)
                      }
                    />
                    <Label htmlFor={item}>{item}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Къде ще тренирате предимно?
              </h3>
              <RadioGroup
                value={surveyData.location}
                onValueChange={(value) => updateData("location", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">У дома</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gym" id="gym" />
                  <Label htmlFor="gym">Фитнес зала</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="outdoor" id="outdoor" />
                  <Label htmlFor="outdoor">На открито</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mixed" id="mixed" />
                  <Label htmlFor="mixed">Комбинирано</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Имате ли наранявания или ограничения?
              </h3>
              <Textarea
                placeholder="Опишете наранявания, болки или физически ограничения (незадължително)"
                value={surveyData.injuries}
                onChange={(e) => updateData("injuries", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Имате ли здравословни проблеми?
              </h3>
              <Textarea
                placeholder="Опишете хронични заболявания или здравословни проблеми (незадължително)"
                value={surveyData.healthConditions}
                onChange={(e) => updateData("healthConditions", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Приемате ли медикаменти?
              </h3>
              <Textarea
                placeholder="Опишете медикаменти, които приемате редовно (незадължително)"
                value={surveyData.medications}
                onChange={(e) => updateData("medications", e.target.value)}
                rows={2}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Какъв тип диета следвате?
              </h3>
              <RadioGroup
                value={surveyData.dietType}
                onValueChange={(value) => updateData("dietType", value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="normal" id="normal" />
                  <Label htmlFor="normal">Обикновена диета</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegetarian" id="vegetarian" />
                  <Label htmlFor="vegetarian">Вегетарианска</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vegan" id="vegan" />
                  <Label htmlFor="vegan">Веганска</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keto" id="keto" />
                  <Label htmlFor="keto">Кетогенна</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paleo" id="paleo" />
                  <Label htmlFor="paleo">Палео</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Друга</Label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Имате ли хранителни ограничения?
              </h3>
              <Textarea
                placeholder="Алергии, непоносимости или храни, които избягвате (незадължително)"
                value={surveyData.foodRestrictions}
                onChange={(e) => updateData("foodRestrictions", e.target.value)}
                rows={3}
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">
                Допълнителна информация
              </h3>
              <Textarea
                placeholder="Всичко друго, което смятате за важно да знаем (незадължително)"
                value={surveyData.additionalInfo}
                onChange={(e) => updateData("additionalInfo", e.target.value)}
                rows={4}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = [
    "Основни цели и опит",
    "График на тренировки",
    "Лични данни",
    "Оборудване и място",
    "Здравословни съображения",
    "Диетични предпочитания",
  ];

  return (
    <div className="min-h-screen bg-fitness-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <Target className="h-8 w-8 text-fitness-primary" />
            <span className="text-2xl font-bold text-fitness-dark">
              FitnessPlan AI
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-fitness-neutral">
              Стъпка {currentStep + 1} от {totalSteps}
            </span>
            <span className="text-sm font-medium text-fitness-neutral">
              {Math.round(progress)}% завършено
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Survey Card */}
        <Card className="shadow-xl">
          <CardHeader className="bg-fitness-primary text-white">
            <CardTitle className="text-2xl">
              {stepTitles[currentStep]}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="animate-fade-in">{renderStep()}</div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>
                  {currentStep === 0 ? "Назад към началото" : "Назад"}
                </span>
              </Button>

              <Button
                onClick={handleNext}
                disabled={!canProceed() || isLoading}
                className="flex items-center space-x-2 btn-primary"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Обработва се...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {currentStep === totalSteps - 1
                        ? "Към плащане"
                        : "Напред"}
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
