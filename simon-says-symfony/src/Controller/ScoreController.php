<?php

namespace App\Controller;

use App\Entity\Score;
use App\Form\ScoreType;
use App\Repository\ScoreRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/score")
 */
class ScoreController extends AbstractController
{
    /**
     * @Route("/", name="score_index", methods={"GET"})
     */
    public function index(ScoreRepository $scoreRepository): Response
    {
        $response = new Response();


        $serializer = $this->container->get('serializer');
        $json = $serializer->serialize($scoreRepository->findByScore(), 'json');

        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent($json);

        return $response;
    }

    /**
     * @Route("/new", name="score_new", methods={"GET","POST"})
     */
    public function new(Request $request): Response
    {
        $response = new Response();

        $serializer = $this->container->get('serializer');
        $score = new Score();
        $form = $this->createForm(ScoreType::class, $score);

        $data = json_decode($request->getContent(), true);
        $form->submit($data);

        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($score);
        $entityManager->flush();

        $id = $score->getId();

        $json = $serializer->serialize($id,'json');

        $response->setContent($json);

        return $response;
    }

    
}
