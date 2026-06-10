import { Hero } from '@/components/home/Hero'
import { StatsSection } from '@/components/home/StatsSection'
import { NewsSection } from '@/components/home/NewsSection'
import { ProjectsSection } from '@/components/home/ProjectsSection'
import { MissionSection } from '@/components/home/MissionSection'
import { GallerySection } from '@/components/home/GallerySection'

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <NewsSection />
      <ProjectsSection />
      <MissionSection />
      <GallerySection />
    </>
  )
}
