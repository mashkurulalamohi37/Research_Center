import asyncio
import uuid
from app.database.session import AsyncSessionLocal, engine, Base
from app.core.security import get_password_hash
from app.models.user import User
from app.models.researcher import Researcher
from app.models.research_area import ResearchArea
from app.models.publication import Publication
from app.models.project import Project
from app.models.content import (
    NewsArticle, EventItem, Opportunity, ResourceItem, Partner
)


async def seed_data():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as db:
        # Check if already seeded
        from sqlalchemy import select
        existing = (await db.execute(select(User))).scalars().first()
        if existing:
            print("Database already contains records. Skipping initial seeding.")
            return

        print("Seeding AIRC database with institutional academic records...")

        # 1. Admin Users & Faculty Users
        admin_user = User(
            id="usr-director-01",
            email="admin@airc.research.edu",
            hashed_password=get_password_hash("AdminPass123!"),
            name="Prof. Dr. Sarah Lin",
            role="SUPER_ADMIN",
            avatar_url="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
        )
        researcher_user = User(
            id="usr-marcus-01",
            email="marcus@airc.research.edu",
            hashed_password=get_password_hash("ResearcherPass123!"),
            name="Dr. Marcus Vance",
            role="RESEARCHER",
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        )
        db.add_all([admin_user, researcher_user])

        # 2. Research Areas (8 disciplines)
        areas = [
            ResearchArea(
                id="ai-core",
                slug="ai-foundations",
                title="AI Foundations & Neuro-Symbolic Reasoning",
                short_description="Advancing mathematical foundations of intelligence, formal logic verification, and provable safety bounds.",
                full_description="The AI Foundations Group conducts research into provably robust neural architectures, formal methods in neural verification, and neuro-symbolic reasoning.",
                icon="Brain",
                publication_count=42,
                project_count=6,
                featured=True,
                objectives=["Derive mathematical verification techniques for neural reasoning."],
                key_technologies=["Neuro-Symbolic Transformers", "SMT Solvers", "PyTorch Geometric"]
            ),
            ResearchArea(
                id="computer-vision",
                slug="computer-vision",
                title="Computer Vision & Spatial Computing",
                short_description="Real-time multi-view Gaussian splatting, dynamic 3D neural reconstruction, and surgical robotic vision.",
                full_description="Developing world-class visual perception pipelines for medical robotics, autonomous aerial navigation, and photorealistic 3D neural fields.",
                icon="Eye",
                publication_count=38,
                project_count=5,
                featured=True,
                objectives=["Real-time sub-millimeter 3D neural surgical navigation."],
                key_technologies=["3D Gaussian Splatting", "NeRFs", "CUDA Kernels"]
            ),
            ResearchArea(
                id="robotics",
                slug="robotics-autonomous-systems",
                title="Autonomous Robotics & Swarm Intelligence",
                short_description="Multi-agent reinforcement learning for autonomous aerial platforms and field robotics.",
                full_description="Designing decentralized multi-agent control architectures, distributed SLAM, and resilient navigation systems.",
                icon="Bot",
                publication_count=29,
                project_count=4,
                featured=True,
                objectives=["Decentralized collision avoidance and swarm coordination."],
                key_technologies=["ROS2", "PX4 Autopilot", "MARL Algorithms"]
            ),
            ResearchArea(
                id="healthcare-ai",
                slug="healthcare-ai",
                title="Biomedical Imaging & Clinical AI",
                short_description="AI-driven digital pathology, multi-modal medical diagnostics, and clinical trial analytics.",
                full_description="Bridging deep learning with clinical workflows to deliver interpretable, patient-safe diagnostic assistance.",
                icon="Activity",
                publication_count=45,
                project_count=7,
                featured=True,
                objectives=["Interpretable pathological screening algorithms."],
                key_technologies=["Vision-Language Medical Models", "DICOM Pipeline"]
            )
        ]
        db.add_all(areas)

        # 3. Researchers
        researchers = [
            Researcher(
                id="dr-sarah-lin",
                user_id="usr-director-01",
                slug="prof-sarah-lin",
                name="Prof. Dr. Sarah Lin",
                title="Founding Director & Distinguished Professor",
                category="faculty",
                department="Department of Computer Science & AI",
                email="director@airc.research.edu",
                office="Turing Hall, Executive Suite 401",
                avatar="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
                bio="Prof. Sarah Lin is the Founding Director of AIRC and an IEEE Fellow. Her research pioneered formal verification algorithms for neural networks.",
                education=[{"degree": "Ph.D. in Computer Science", "institution": "MIT", "year": 2008}],
                h_index=64,
                citations=24500,
                featured=True,
                status="active",
                join_date="2020-01-15",
                research_area_ids=["ai-core"],
                expertise=["Neuro-symbolic Reasoning", "Formal Verification", "AI Safety"]
            ),
            Researcher(
                id="dr-marcus-vance",
                user_id="usr-marcus-01",
                slug="dr-marcus-vance",
                name="Dr. Marcus Vance",
                title="Lead Investigator, Visual Intelligence Lab",
                category="faculty",
                department="Department of Electrical & Computer Engineering",
                email="marcus@airc.research.edu",
                office="Turing Hall, Room 304",
                avatar="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
                bio="Dr. Marcus Vance leads research on 3D neural reconstruction, dynamic Gaussian splatting, and real-time medical vision systems.",
                education=[{"degree": "Ph.D. in Computer Vision", "institution": "Stanford University", "year": 2016}],
                h_index=39,
                citations=9800,
                featured=True,
                status="active",
                join_date="2021-08-01",
                research_area_ids=["computer-vision", "healthcare-ai"],
                expertise=["3D Gaussian Splatting", "Neural Fields", "Surgical Robotics"]
            )
        ]
        db.add_all(researchers)

        # 4. Publications
        publications = [
            Publication(
                id="pub-01",
                slug="sub-millimeter-3d-intraoperative-neural-splatting",
                title="Sub-Millimeter 3D Intraoperative Neural Splatting for Minimally Invasive Robotic Surgery",
                authors=["Marcus Vance", "Sophia Meng", "Sarah Lin"],
                venue="CVPR 2025 (Oral Presentation)",
                publisher="IEEE / CVF",
                year=2025,
                type="Conference",
                research_area_id="computer-vision",
                abstract="We present LaproSplat, an explicit 3D Gaussian splatting pipeline capable of 120 FPS intraoperative continuous surface reconstruction.",
                keywords=["3D Gaussian Splatting", "Surgical Robotics", "Neural Rendering"],
                doi="10.1109/CVPR52688.2025.01248",
                citations=142,
                featured=True,
                status="Published"
            ),
            Publication(
                id="pub-02",
                slug="neurologic-v2-provable-symbolic-verification",
                title="NeuroLogic-v2: Provably Robust Symbolic Verification for Large Multi-Agent Foundation Models",
                authors=["Sarah Lin", "James K. Chen", "David Thorne"],
                venue="NeurIPS 2024 (Spotlight Paper)",
                publisher="Curran Associates",
                year=2024,
                type="Conference",
                research_area_id="ai-core",
                abstract="A novel formal verification framework establishing deterministic safety bounds for deep transformer architectures.",
                keywords=["Neuro-Symbolic AI", "Formal Verification", "Transformer Safety"],
                doi="10.48550/arXiv.2410.09182",
                citations=380,
                featured=True,
                status="Published"
            )
        ]
        db.add_all(publications)

        # 5. Projects
        projects = [
            Project(
                id="proj-01",
                slug="laprosplat-surgical-navigation",
                project_code="NIH-R01-EB029841",
                title="LaproSplat: Real-Time Dynamic 3D Neural Scene Reconstruction for Surgical Guidance",
                short_description="Developing real-time 3D Gaussian splatting systems deployed in live robotic operating theaters.",
                full_description="In partnership with Massachusetts General Hospital and Harvard Medical School, this project builds intraoperative micro-navigation overlays.",
                status="Ongoing",
                start_date="2023-09-01",
                end_date="2027-08-31",
                funding_body="National Institutes of Health (NIH)",
                funding_amount="$3,200,000",
                research_area_id="computer-vision",
                principal_investigator_id="dr-marcus-vance",
                featured=True,
                deliverables=[
                    {"title": "Sub-millimeter camera calibration suite", "date": "2024-03-15", "completed": True},
                    {"title": "120 FPS dynamic Gaussian splatting engine", "date": "2025-01-10", "completed": True},
                    {"title": "Phase-I clinical evaluation on 50 surgical procedures", "date": "2026-06-30", "completed": False}
                ]
            )
        ]
        db.add_all(projects)

        # 6. News & Opportunities
        news = [
            NewsArticle(
                id="news-01",
                slug="airc-wins-cvpr-best-paper-award",
                title="AIRC Visual Intelligence Team Wins CVPR 2025 Best Paper Award for LaproSplat",
                excerpt="The Visual Intelligence Laboratory was awarded Best Paper for revolutionary real-time surgical neural splatting.",
                content="The award recognizes pioneering contributions in bridging computer vision neural fields with clinical operating procedures.",
                publish_date="2025-06-20",
                author="AIRC Scientific Communications",
                category="Award",
                featured=True
            )
        ]
        db.add_all(news)

        opportunities = [
            Opportunity(
                id="opp-01",
                slug="postdoctoral-fellowship-neural-rendering",
                title="Distinguished Postdoctoral Fellowship in 3D Neural Fields & Surgical Perception",
                type="Postdoctoral Fellowship",
                department="Visual Intelligence Laboratory",
                supervisor_name="Dr. Marcus Vance",
                description="Conduct foundational research in real-time 3D neural radiance fields and robotic endoscopy.",
                duration="2 Years (Renewable)",
                deadline="2026-11-15",
                stipend="$92,000/year + Full Benefits + $15k Research Fund",
                status="Open",
                featured=True
            )
        ]
        db.add_all(opportunities)

        await db.commit()
        print("AIRC Database successfully seeded with full academic dataset!")


if __name__ == "__main__":
    asyncio.run(seed_data())
