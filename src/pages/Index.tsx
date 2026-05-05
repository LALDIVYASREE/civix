import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { FileText, Zap, CheckCircle, TrendingUp, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import slideRoadWork from "@/assets/slide-road-work.jpg";
import slideRailwayWork from "@/assets/slide-railway-work.jpg";
import slideWaterWork from "@/assets/slide-water-work.jpg";
import slideSanitationWork from "@/assets/slide-sanitation-work.jpg";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    { image: slideRoadWork, alt: "Road construction workers repairing asphalt" },
    { image: slideRailwayWork, alt: "Railway maintenance crew working on tracks" },
    { image: slideWaterWork, alt: "Water supply workers installing pipes" },
    { image: slideSanitationWork, alt: "Sanitation workers cleaning streets" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const features = [
    {
      icon: FileText,
      title: "Submit Your Complaint",
      description: "Easily submit complaints or suggestions about public services with our intuitive form.",
    },
    {
      icon: Zap,
      title: "Civix Categorizes Automatically",
      description: "Our smart App instantly categorizes and routes your complaint to the right department.",
    },
    {
      icon: CheckCircle,
      title: "Officers Take Action",
      description: "Track real-time progress as assigned officers work to resolve your issues quickly.",
    },
  ];

  const benefits = [
    {
      icon: TrendingUp,
      title: "Transparency",
      description: "Complete visibility into complaint status and resolution progress.",
    },
    {
      icon: Clock,
      title: "Quick Resolution",
      description: "AI-powered routing ensures faster response times and efficient handling.",
    },
    {
      icon: Shield,
      title: "Digital Governance",
      description: "Modern, secure platform built for effective citizen-government interaction.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-hero overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Empowering Citizens through{" "}
                  Public Service Feedback
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Submit complaints, track issues, and get faster resolutions with smart automation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/submit-complaint">
                    <Button size="lg" className="bg-gradient-civic hover:opacity-90 transition-opacity w-full sm:w-auto">
                      Submit Complaint
                    </Button>
                  </Link>
                  <Link to="/track-status">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      Track Status
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="relative h-[400px] lg:h-[500px] rounded-2xl shadow-elevated overflow-hidden">
                  {slides.map((slide, index) => (
                    <img
                      key={index}
                      src={slide.image}
                      alt={slide.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        currentSlide === index ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  ))}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentSlide === index ? "bg-white w-8" : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Three simple steps to make your voice heard and get issues resolved
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="border-2 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="pt-6">
                      <div className="h-12 w-12 rounded-lg bg-gradient-civic flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* About Us */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Civix</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Bridging the gap between citizens and public services through technology
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-card transition-all duration-300">
                    <CardContent className="pt-6">
                      <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-civic text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of citizens using Civix to improve public services
            </p>
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
